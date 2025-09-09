import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { baseURL } from "../api/base";
import "./TourList.css";
import TourFilterBox from "../components/TourFilterBox";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function TourList() {
  const [allTours, setAllTours] = useState([]); // همه تورها برای لیست مقاصد
  const [tours, setTours] = useState([]); // تورهای فیلتر شده
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  // فیلترهای محلی
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [dateFrom, setDateFrom] = useState(null);
  const [numOfDays, setNumOfDays] = useState("");
  const [hotelStar, sethotelStar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedDestinations.length > 0) {
      selectedDestinations.forEach((dest) => {
        params.append("destination", dest);
      });
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

    // تغییر URL بدون رفرش صفحه
    navigate(`/tours?${params.toString()}`, { replace: true });
  }, [
    selectedDestinations,
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
            type: searchParams.get("type") || undefined,
            duration_days: searchParams.get("duration") || undefined,
            hotelStar: searchParams.get("hotelStar") || undefined,
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

  // استخراج لیست مقصدها از همه تورها
  const destinations = useMemo(() => {
    const unique = new Set(allTours.map((t) => t.destination));
    return Array.from(unique);
  }, [allTours]);

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
    if (destsFromUrl.length > 0) {
      setSelectedDestinations(destsFromUrl);
    } else {
      setSelectedDestinations([]);
    }

    const startDateFromUrl = searchParams.get("startDate");
    if (startDateFromUrl) {
      setDateFrom(startDateFromUrl);
    } else {
      setDateFrom(null);
    }

    const durationFromUrl =
      searchParams.get("duration") || searchParams.get("type");
    if (durationFromUrl) {
      setNumOfDays(durationFromUrl);
    } else {
      setNumOfDays("");
    }

    const hotelStarFromUrl = searchParams.get("hotelStar");
    if (hotelStarFromUrl) {
      sethotelStar(hotelStarFromUrl);
    } else {
      sethotelStar("");
    }
  }, [searchParams]);

  // فیلتر کردن تورها (توجه: اینجا از `tours` که از سرور فیلتر شده استفاده می‌کنیم، اما باز فیلتر محلی هم میزنیم)
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      if (
        selectedDestinations.length > 0 &&
        !selectedDestinations.includes(tour.destination)
      ) {
        return false;
      }

      if (dateFrom) {
        const formattedTourDate = tour.departure.date_jalali; // رشته ۱۴۰۴/۰۶/۱۵

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
  }, [tours, selectedDestinations, dateFrom, priceRange, numOfDays]);

  // تغییر انتخاب مقصد در فیلتر
  function toggleDestination(dest) {
    if (selectedDestinations.includes(dest)) {
      setSelectedDestinations((prev) => prev.filter((d) => d !== dest));
    } else {
      setSelectedDestinations((prev) => [...prev, dest]);
    }
  }

  return (
    <div className="tour-page">
      <TourFilterBox
        destinations={destinations}
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
              <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />{" "}
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
                    قیمت: <strong>${tour.price}</strong>
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </div>
  );
}
