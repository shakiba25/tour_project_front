import React, { useEffect, useState, useMemo } from "react";
import axiosClient from "../api/axiosClient";
import { baseURL } from "../api/base";
import SearchBoxNew from "../components/SearchBox";
import "./AirlineLanding.css";
import { Link } from "react-router-dom";

export default function LandingNew() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const response = await axiosClient.get("/tours/");
        setAllTours(response.data);
      } catch (error) {
        console.error("خطا در دریافت تورها:", error);
        setAllTours([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTours();
  }, []);

  const popularDestinations = useMemo(() => {
    const destCount = {};
    allTours.forEach((tour) => {
      destCount[tour.destination] = (destCount[tour.destination] || 0) + 1;
    });
    const sortedDestinations = Object.entries(destCount)
      .sort((a, b) => b[1] - a[1])
      .map(([destination]) => destination);
    return sortedDestinations.slice(0, 3);
  }, [allTours]);

  const cheapestTours = useMemo(() => {
    const sorted = [...allTours].sort((a, b) => a.price - b.price);
    return sorted.slice(0, 3);
  }, [allTours]);

  const mostExpensiveTours = useMemo(() => {
    const sorted = [...allTours].sort((a, b) => b.price - a.price);
    return sorted.slice(0, 3);
  }, [allTours]);

  if (loading) return <p className="loading-text">در حال بارگذاری...</p>;

  return (
    <div className="landing-new">
      {/* بنر هیرو */}
      <section className="hero-new">
        <div className="hero-overlay">
          <h1 className="hero-title animate-fade">سفر رویایی خود را آغاز کنید</h1>
          <p className="hero-subtitle animate-fade-delay">
            با بهترین تورها و مقاصد جذاب، دنیای خود را کشف کنید
          </p>
          <Link to="/tours" className="hero-button animate-fade-delay">
            مشاهده تورها
          </Link>
        </div>
      </section>

      {/* بخش جستجو */}
      <section className="search-section-new">
        <SearchBoxNew />
      </section>

      {/* چت با دستیار هوش مصنوعی */}
      <section className="ai-chat-section">
        <div className="ai-chat-card animate-zoom">
          <h2>چت با دستیار هوش مصنوعی</h2>
          <p>سؤالات خود درباره تورها، مقاصد و هتل‌ها را بپرسید و سریع پاسخ بگیرید.</p>
          <Link to="/chat" className="ai-chat-button">
            شروع گفتگو
          </Link>
        </div>
      </section>

      {/* مقاصد محبوب */}
      <section className="popular-destinations-new">
        <h2>مقاصد محبوب</h2>
        <div className="grid-destinations">
          {popularDestinations.map((dest) => (
            <div key={dest} className="destination-card-new animate-fade-up">
              <img
                src={
                  allTours.find((tour) => tour.destination === dest)
                    ? `${baseURL}${allTours.find((tour) => tour.destination === dest).images[0]?.url}`
                    : "https://via.placeholder.com/300"
                }
                alt={dest}
              />
              <h3>{dest}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ارزان ترین تورها */}
      <section className="cheap-tours-new">
        <h2>ارزان‌ترین تورها</h2>
        <div className="grid-tours">
          {cheapestTours.map((tour) => (
            <div key={tour.tour_id} className="tour-card-new animate-fade-up">
              <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />
              <h3>{tour.name}</h3>
              <p>مقصد: {tour.destination}</p>
              <p>قیمت: ${tour.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* گران ترین تورها */}
      <section className="expensive-tours-new">
        <h2>گران‌ترین تورها</h2>
        <div className="grid-tours">
          {mostExpensiveTours.map((tour) => (
            <div key={tour.tour_id} className="tour-card-new animate-fade-up">
              <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />
              <h3>{tour.name}</h3>
              <p>مقصد: {tour.destination}</p>
              <p>قیمت: ${tour.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* فوتر */}
      <footer className="footer-new">© 2025 - همه حقوق محفوظ است</footer>
    </div>
  );
}
