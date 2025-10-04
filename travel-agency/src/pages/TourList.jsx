import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { baseURL } from "../api/base";
import "./TourList.css";
import TourFilterBox from "../components/TourFilterBox";
import dayjs from "dayjs";

export default function TourList() {
  const [allTours, setAllTours] = useState([]); // همه تورها برای لیست مقصدها
  const [tours, setTours] = useState([]); // تورهای فیلتر شده
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // فیلترهای محلی
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [dateFrom, setDateFrom] = useState(null);
  const [numOfDays, setNumOfDays] = useState("");
  const [hotelStar, sethotelStar] = useState("");
  const [destinationType, setDestinationType] = useState("");

  // تغییر URL بر اساس فیلترها
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedDestinations.length > 0) {
      selectedDestinations.forEach((dest) => {
        params.append("destination", dest);
      });
    }
    if (destinationType) {
      params.set("destination_type", destinationType);
    }
    if (dateFrom) {
      params.set("startDate", dateFrom);
    }
    if (numOfDays) {
      params.set("duration", numOfDays);
    }
    if (hotelStar) {
      params.set("hotelStar", hotelStar);
    }
    if (priceRange && priceRange.length === 2) {
      params.set("minPrice", priceRange[0]);
      params.set("maxPrice", priceRange[1]);
    }

    navigate(`/tours?${params.toString()}`, { replace: true });
  }, [
    selectedDestinations,
    destinationType,
    dateFrom,
    numOfDays,
    hotelStar,
    priceRange,
    navigate,
  ]);

  // دریافت همه تورها برای ساخت لیست مقصدها
  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const response = await axiosClient.get("/tours/");
        setAllTours(response.data);
      } catch (error) {
        console.error("خطا در دریافت همه تورها:", error);
        setAllTours([]);
      }
    };
    fetchAllTours();
  }, []);

  // دریافت تورهای فیلتر شده بر اساس پارامترهای URL
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get("/tours/", {
          params: {
            destination: searchParams.getAll("destination") || undefined,
            start_date: searchParams.get("startDate") || undefined,
            end_date: searchParams.get("endDate") || undefined,
            destination_type: searchParams.get("destination_type") || undefined,
            duration_days: searchParams.get("duration") || undefined,
            hotelStar: searchParams.get("hotelStar") || undefined,
            minPrice: searchParams.get("minPrice") || undefined,
            maxPrice: searchParams.get("maxPrice") || undefined,
          },
        });
        setTours(response.data);
      } catch (error) {
        console.error("خطا در دریافت تورها:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [searchParams]);

// استخراج لیست مقصدها همراه با نوع مقصد
const destinations = useMemo(() => {
  const unique = new Map();
  allTours.forEach((t) => {
    if (!unique.has(t.destination)) {
      unique.set(t.destination, { name: t.destination, type: t.destination_type });
    }
  });
  return Array.from(unique.values());
}, [allTours]);

// فیلتر بر اساس نوع مقصد انتخاب‌شده
const filteredDestinationsByType = destinationType
  ? destinations.filter((d) => d.type === destinationType)
  : destinations;

  // محاسبه قیمت حداقل و حداکثر از همه تورها
  const prices = useMemo(() => allTours.map((t) => t.price), [allTours]);
  const absoluteMinPrice = prices.length ? Math.min(...prices) : 0;
  const absoluteMaxPrice = prices.length ? Math.max(...prices) : 1000;

  // تنظیم رنج قیمت اولیه
  useEffect(() => {
    if (prices.length) {
      setPriceRange([absoluteMinPrice, absoluteMaxPrice]);
    }
  }, [absoluteMinPrice, absoluteMaxPrice]);

  // ست کردن فیلترهای اولیه بر اساس URL
  useEffect(() => {
    const destsFromUrl = searchParams.getAll("destination");
    setSelectedDestinations(destsFromUrl.length > 0 ? destsFromUrl : []);

    const typeFromUrl = searchParams.get("destination_type");
    setDestinationType(typeFromUrl || "");

    const startDateFromUrl = searchParams.get("startDate");
    setDateFrom(startDateFromUrl || null);

    const durationFromUrl = searchParams.get("duration");
    setNumOfDays(durationFromUrl || "");

    const hotelStarFromUrl = searchParams.get("hotelStar");
    sethotelStar(hotelStarFromUrl || "");
  }, [searchParams]);

  // فیلتر نهایی روی تورها
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      if (
        selectedDestinations.length > 0 &&
        !selectedDestinations.includes(tour.destination)
      ) {
        return false;
      }

      if (destinationType && tour.destination_type !== destinationType) {
        return false;
      }

      if (dateFrom) {
        const formattedTourDate = tour.departure.date_jalali; // مثل ۱۴۰۴/۰۶/۱۵

        let formattedDateFrom;
        if (typeof dateFrom === "string") {
          formattedDateFrom = dateFrom.replace(/[۰-۹]/g, (d) =>
            "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()
          );
        } else if (dayjs.isDayjs(dateFrom)) {
          formattedDateFrom = dateFrom
            .format("YYYY/MM/DD")
            .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
        } else {
          return true;
        }

        const normalizedTourDate = formattedTourDate.replace(/[۰-۹]/g, (d) =>
          "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()
        );

        if (normalizedTourDate < formattedDateFrom) return false;
      }

      if (numOfDays && parseInt(tour.duration_days) !== parseInt(numOfDays)) {
        return false;
      }
      if (hotelStar && parseInt(tour.hotel.star) !== parseInt(hotelStar)) {
        return false;
      }
      if (priceRange && priceRange.length === 2) {
        if (tour.price < priceRange[0] || tour.price > priceRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [
    tours,
    selectedDestinations,
    destinationType,
    dateFrom,
    priceRange,
    numOfDays,
    hotelStar,
  ]);

  // تغییر انتخاب مقصد در فیلتر
  function toggleDestination(dest) {
    if (selectedDestinations.includes(dest)) {
      setSelectedDestinations((prev) => prev.filter((d) => d !== dest));
    } else {
      setSelectedDestinations((prev) => [...prev, dest]);
    }
  }

  return (
    <div className="page">
      <div className="tour-page">
        <TourFilterBox
          destinations={filteredDestinationsByType}
          selectedDestinations={selectedDestinations}
          toggleDestination={toggleDestination}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          absoluteMinPrice={absoluteMinPrice}
          absoluteMaxPrice={absoluteMaxPrice}
          numOfDays={numOfDays}
          setNumOfDays={setNumOfDays}
          hotelStar={hotelStar}
          sethotelStar={sethotelStar}
          destinationType={destinationType}
          setDestinationType={setDestinationType}
        />
        <section className="tour-list">
          {loading ? (
            <p>در حال بارگذاری...</p>
          ) : filteredTours.length === 0 ? (
            <p>هیچ توری با این فیلتر پیدا نشد.</p>
          ) : (
            filteredTours.map((tour) => (
              <Link
                to={`/tours/${tour.tour_id}`}
                key={tour.tour_id}
                className="tour-card"
              >
                <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />
                <div className="tour-info">
                  <h2>{tour.name}</h2>
                  <div className="tour-details-row">
                    <p className="tour-detail">
                      مقصد: <strong>{tour.destination}</strong>
                    </p>
                    <span className="separator">|</span>
                    <p className="tour-detail">
                      مدت: <strong>{tour.duration_days} روز</strong>
                    </p>
                    <span className="separator">|</span>
                    <p className="tour-detail">
                      تاریخ رفت: <strong>{tour.departure.date_jalali}</strong>
                    </p>
                    <span className="separator">|</span>
                    <p className="tour-detail">
                      قیمت: <strong>{tour.price} تومان</strong>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
// import React, { useState, useMemo, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import axiosClient from "../api/axiosClient";
// import "./TourList.css";
// import TourFilters from "../components/TourFilters";
// import TourResults from "../components/TourResults";
// import dayjs from "dayjs";

// export default function TourList() {
//   const [allTours, setAllTours] = useState([]);
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // استیت‌های فیلتر
//   const [selectedDestinations, setSelectedDestinations] = useState([]);
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [dateFrom, setDateFrom] = useState(null);
//   const [numOfDays, setNumOfDays] = useState("");
//   const [hotelStar, sethotelStar] = useState("");
//   const [destinationType, setDestinationType] = useState("");

//   // دریافت داده‌ها (allTours و tours)
//   useEffect(() => {
//     axiosClient.get("/tours/").then((res) => setAllTours(res.data));
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axiosClient
//       .get("/tours/", {
//         params: {
//           destination: searchParams.getAll("destination"),
//           destination_type: searchParams.get("destination_type"),
//           start_date: searchParams.get("startDate"),
//           duration_days: searchParams.get("duration"),
//           hotelStar: searchParams.get("hotelStar"),
//           minPrice: searchParams.get("minPrice"),
//           maxPrice: searchParams.get("maxPrice"),
//         },
//       })
//       .then((res) => setTours(res.data))
//       .finally(() => setLoading(false));
//   }, [searchParams]);

//   // ساخت لیست مقصدها
//   const destinations = useMemo(() => {
//     const unique = new Map();
//     allTours.forEach((t) => {
//       if (!unique.has(t.destination)) {
//         unique.set(t.destination, { name: t.destination, type: t.destination_type });
//       }
//     });
//     return Array.from(unique.values());
//   }, [allTours]);

//   const filteredDestinationsByType = destinationType
//     ? destinations.filter((d) => d.type === destinationType)
//     : destinations;

//   const prices = useMemo(() => allTours.map((t) => t.price), [allTours]);
//   const absoluteMinPrice = prices.length ? Math.min(...prices) : 0;
//   const absoluteMaxPrice = prices.length ? Math.max(...prices) : 1000;

//   return (
//     <div className="tour-page">
//       <TourFilters
//         destinations={filteredDestinationsByType}
//         selectedDestinations={selectedDestinations}
//         toggleDestination={(dest) =>
//           setSelectedDestinations((prev) =>
//             prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
//           )
//         }
//         dateFrom={dateFrom}
//         setDateFrom={setDateFrom}
//         priceRange={priceRange}
//         setPriceRange={setPriceRange}
//         absoluteMinPrice={absoluteMinPrice}
//         absoluteMaxPrice={absoluteMaxPrice}
//         numOfDays={numOfDays}
//         setNumOfDays={setNumOfDays}
//         hotelStar={hotelStar}
//         sethotelStar={sethotelStar}
//         destinationType={destinationType}
//         setDestinationType={setDestinationType}
//       />

//       <TourResults tours={tours} loading={loading} />
//     </div>
//   );
// }
