import React, { useState, useMemo } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./TourList.css";

const toursData = [
  {
    tour_id: "tour_001",
    name: "تور 3 روزه کیش",
    destination: "کیش",
    duration_days: 3,
    price_usd: 200,
    departure: { date: "1404-08-15", time: "08:30" },
    return: { date: "1404-08-18", time: "18:45" },
    hotel: { name: "هتل ترنج", star: 4 },
    services: [
      "پرواز رفت و برگشت",
      "ترانسفر فرودگاهی",
      "صبحانه",
      "هتل 4 ستاره",
    ],
    itinerary: ["بازدید از شهر تاریخی حریره", "ساحل مرجانی", "کشتی یونانی"],
    insurance_included: true,
    rich_text:
      "در ایام خاص مانند <b>تعطیلات نوروز</b> امکان افزایش قیمت وجود دارد.",
    images: [
      "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    tour_id: "tour_002",
    name: "تور 5 روزه مشهد",
    destination: "مشهد",
    duration_days: 5,
    price_usd: 350,
    departure: { date: "1404-09-10", time: "09:00" },
    return: { date: "1404-09-15", time: "20:00" },
    hotel: { name: "هتل سیمرغ", star: 3 },
    services: ["پرواز رفت و برگشت", "صبحانه", "هتل 3 ستاره"],
    itinerary: ["بازدید از حرم امام رضا", "شهر تاریخی توس"],
    insurance_included: false,
    rich_text: "امکان رزرو گروهی با تخفیف.",
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    tour_id: "tour_002",
    name: "تور 5 روزه مشهد",
    destination: "مشهد",
    duration_days: 5,
    price_usd: 350,
    departure: { date: "1404-09-10", time: "09:00" },
    return: { date: "1404-09-15", time: "20:00" },
    hotel: { name: "هتل سیمرغ", star: 3 },
    services: ["پرواز رفت و برگشت", "صبحانه", "هتل 3 ستاره"],
    itinerary: ["بازدید از حرم امام رضا", "شهر تاریخی توس"],
    insurance_included: false,
    rich_text: "امکان رزرو گروهی با تخفیف.",
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    tour_id: "tour_002",
    name: "تور 5 روزه مشهد",
    destination: "مشهد",
    duration_days: 5,
    price_usd: 350,
    departure: { date: "1404-09-10", time: "09:00" },
    return: { date: "1404-09-15", time: "20:00" },
    hotel: { name: "هتل سیمرغ", star: 3 },
    services: ["پرواز رفت و برگشت", "صبحانه", "هتل 3 ستاره"],
    itinerary: ["بازدید از حرم امام رضا", "شهر تاریخی توس"],
    insurance_included: false,
    rich_text: "امکان رزرو گروهی با تخفیف.",
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    tour_id: "tour_002",
    name: "تور 5 روزه مشهد",
    destination: "مشهد",
    duration_days: 5,
    price_usd: 350,
    departure: { date: "1404-09-10", time: "09:00" },
    return: { date: "1404-09-15", time: "20:00" },
    hotel: { name: "هتل سیمرغ", star: 3 },
    services: ["پرواز رفت و برگشت", "صبحانه", "هتل 3 ستاره"],
    itinerary: ["بازدید از حرم امام رضا", "شهر تاریخی توس"],
    insurance_included: false,
    rich_text: "امکان رزرو گروهی با تخفیف.",
    images: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
];

export default function TourList() {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [dateFrom, setDateFrom] = useState(null);
  const [showDestinations, setShowDestinations] = useState(true);

  const destinations = useMemo(() => {
    const unique = new Set(toursData.map((t) => t.destination));
    return Array.from(unique);
  }, []);

  const prices = useMemo(() => toursData.map((t) => t.price_usd), []);
  const absoluteMinPrice = Math.min(...prices);
  const absoluteMaxPrice = Math.max(...prices);

  const filteredTours = useMemo(() => {
    return toursData.filter((tour) => {
      if (
        selectedDestinations.length > 0 &&
        !selectedDestinations.includes(tour.destination)
      ) {
        return false;
      }
      if (dateFrom) {
        if (new Date(tour.departure.date) < dateFrom.toDate()) return false;
      }
      if (tour.price_usd < priceRange[0] || tour.price_usd > priceRange[1])
        return false;

      return true;
    });
  }, [selectedDestinations, dateFrom, priceRange]);

  function toggleDestination(dest) {
    if (selectedDestinations.includes(dest)) {
      setSelectedDestinations(selectedDestinations.filter((d) => d !== dest));
    } else {
      setSelectedDestinations([...selectedDestinations, dest]);
    }
  }

  return (
    <div className="tour-page">
      {/* فیلترها */}
      <aside className="filter-box">
        <h3>فیلتر تورها</h3>

        {/* مقصد */}
        <div className="filter-section">
          <strong
            style={{ cursor: "pointer" }}
            onClick={() => setShowDestinations(!showDestinations)}
          >
            مقصدها {showDestinations ? "▲" : "▼"}
          </strong>
          {showDestinations && (
            <div className="filter-options">
              {destinations.map((dest) => (
                <label key={dest}>
                  <input
                    type="checkbox"
                    checked={selectedDestinations.includes(dest)}
                    onChange={() => toggleDestination(dest)}
                  />{" "}
                  {dest}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* تاریخ */}
        <div className="filter-section">
          <strong>نمایش از تاریخ:</strong>
          <DatePicker
            value={dateFrom}
            onChange={setDateFrom}
            calendar={persian}
            locale={persian_fa}
            style={{ width: "100%", marginTop: 8 }}
          />
        </div>

        {/* قیمت */}
        <div className="filter-section">
          <strong>قیمت (دلار):</strong>
          <div style={{ marginTop: 15 }}>
            <Slider
              range
              min={absoluteMinPrice}
              max={absoluteMaxPrice}
              value={priceRange}
              onChange={setPriceRange}
            />
            <div style={{ marginTop: 10, fontSize: 14 }}>
              {priceRange[0]}$ - {priceRange[1]}$
            </div>
          </div>
        </div>
      </aside>

      {/* لیست تورها */}
      <section className="tour-list">
        {filteredTours.length === 0 ? (
          <p>هیچ توری با این فیلتر پیدا نشد.</p>
        ) : (
          filteredTours.map((tour) => (
            <div key={tour.tour_id} className="tour-card">
              <img src={tour.images[0]} alt={tour.name} />
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
                    تاریخ رفت: <strong>{tour.departure.date}</strong>
                  </p>
                  <span className="separator">|</span>
                  <p className="tour-detail">
                    قیمت: <strong>${tour.price_usd}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
