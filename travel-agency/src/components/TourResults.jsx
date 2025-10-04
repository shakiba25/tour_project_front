import React from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../api/base";

function TourResults({ tours, loading }) {
  if (loading) return <p>در حال بارگذاری...</p>;
  if (!tours.length) return <p>هیچ توری پیدا نشد.</p>;

  return (
    <section className="tour-list">
      {tours.map((tour) => (
        <Link
          to={`/tours/${tour.tour_id}`}
          key={tour.tour_id}
          className="tour-card"
        >
          <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />
          <div className="tour-info">
            <h2>{tour.name}</h2>
            <div className="tour-details-row">
              <p className="tour-detail">مقصد: <strong>{tour.destination}</strong></p>
              <span className="separator">|</span>
              <p className="tour-detail">مدت: <strong>{tour.duration_days} روز</strong></p>
              <span className="separator">|</span>
              <p className="tour-detail">تاریخ رفت: <strong>{tour.departure.date_jalali}</strong></p>
              <span className="separator">|</span>
              <p className="tour-detail">قیمت: <strong>{tour.price} تومان</strong></p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

export default React.memo(TourResults); // ✅ فقط وقتی tours/ loading تغییر کنه رندر میشه
