// LandingPro.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { baseURL } from "../api/base";
import SearchBoxPro from "../components/SearchBox";
import "./LandingPro.css";

export default function LandingPro() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const response = await axiosClient.get("/tours/");
        setAllTours(response.data);
      } catch (error) {
        console.error(error);
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
    return Object.entries(destCount)
      .sort((a, b) => b[1] - a[1])
      .map(([destination]) => destination)
      .slice(0, 3);
  }, [allTours]);

  const cheapestTours = useMemo(
    () => [...allTours].sort((a, b) => a.price - b.price).slice(0, 3),
    [allTours]
  );
  const mostExpensiveTours = useMemo(
    () => [...allTours].sort((a, b) => b.price - a.price).slice(0, 3),
    [allTours]
  );

  if (loading) return <p className="loading-text">در حال بارگذاری...</p>;

  return (
    <div className="landing-pro">
      <div className="background-blur"></div>

      {/* بنر هیرو */}
      <section className="hero-pro">
        <div className="hero-overlay">
          <h1 className="hero-title">سفر رویایی خود را آغاز کنید</h1>
          <p className="hero-subtitle">
            با تورهای برتر، دنیا را به رنگ‌های آبی و بنفش تجربه کنید
          </p>
          <Link to="/tours" className="hero-btn">
            مشاهده تورها
          </Link>
        </div>
      </section>

      {/* جستجو */}
      <section className="search-section-pro">

        <SearchBoxPro />
      </section>

      {/* چت با دستیار */}
      <section className="ai-chat-section-pro">
        <div className="ai-chat-card-pro">
          <img src="/images/bot1.png" alt="Bot Icon" className="chat-icon" />
          <h2>چت با دستیار هوش مصنوعی</h2>
          <p>سؤالات خود درباره تورها و مقاصد را بپرسید و سریع پاسخ بگیرید</p>
          <Link to="/chat" className="ai-chat-btn-pro">
            شروع گفتگو
          </Link>
        </div>
      </section>

      {/* خط جداکننده */}
      <hr className="section-divider" />

      {/* مقاصد محبوب */}
      <section className="popular-destinations-pro colored-section">
        <img src="/images/pop.png" alt="pop Icon" className="pop-icon" />

        <h2 className="section-title">مقاصد محبوب</h2>
        <p className="section-desc">
          سه مقصد زیر بیشترین تعداد تورها را به خود اختصاص داده‌اند
        </p>
        <div className="grid-destinations-pro">
          {popularDestinations.map((dest) => (
            <div key={dest} className="destination-card-pro">
              <img
                src={
                  allTours.find((t) => t.destination === dest)?.images[0]?.url
                    ? `${baseURL}${
                        allTours.find((t) => t.destination === dest).images[0]
                          .url
                      }`
                    : "https://via.placeholder.com/300"
                }
                alt={dest}
              />
              <h3>{dest}</h3>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* ارزان‌ترین تورها */}
      <section className="cheap-tours-pro colored-section">
        <img src="/images/eco.png" alt="pop Icon" className="pop-icon" />

        <h2 className="section-title">ارزان‌ترین تورها</h2>
        <p className="section-desc">
          سه تور زیر ارزان‌ترین گزینه‌ها برای سفری به‌صرفه هستند
        </p>
        <div className="grid-tours-pro">
          {cheapestTours.map((tour, index) => (
            <div
              key={tour.tour_id}
              className={`tour-card-pro tour-animate-${index}`}
            >
              <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />
              <h3>{tour.name}</h3>
              <p>مقصد: {tour.destination}</p>
              <p>قیمت: ${tour.price}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* گران‌ترین تورها */}
      <section className="expensive-tours-pro colored-section">
        <img src="/images/vip.png" alt="pop Icon" className="pop-icon" />

        <h2 className="section-title">گران‌ترین تورها</h2>
        <p className="section-desc">
          لوکس‌ترین تورهایی که می‌توانید تجربه کنید در این بخش آمده‌اند
        </p>
        <div className="grid-tours-pro">
          {mostExpensiveTours.map((tour, index) => (
            <div
              key={tour.tour_id}
              className={`tour-card-pro tour-animate-${index}`}
            >
              <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />
              <h3>{tour.name}</h3>
              <p>مقصد: {tour.destination}</p>
              <p>قیمت: ${tour.price}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-pro">© 2025 - همه حقوق محفوظ است</footer>
    </div>
  );
}
