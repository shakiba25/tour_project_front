// import "./Landing.css";
// import SearchBox from "../components/SearchBox";

// export default function Landing() {
//   return (
//     <div>
//       {/* هدر
//       <header className="header">
//         <div className="logo">Logo</div>
//         <nav>
//           <a href="#">صفحه اصلی</a>
//           <a href="#">درباره ما</a>
//           <a href="#">تور‌ها</a>
//           <a href="#">تماس</a>
//         </nav>
//         <button>ورود</button>
//       </header> */}

//       {/* بخش هیرو */}
//       <section className="hero">
//         <div className="overlay">
//           <h1>جهان را کشف کنید</h1>
//           <p>سفر به زیباترین مقصد‌های دنیا با بهترین تورها</p>
//           <button>مشاهده تورها</button>
//         </div>

//       </section>

//         {/* 🔹 جستجوی تور */}
//       <SearchBox />

//       {/* مقاصد محبوب */}
//       <section className="destinations">
//         <h2>مقاصد محبوب</h2>
//         <div className="grid">
//           <div className="destination-card">
//             <img
//               src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//               alt="ساحل"
//             />
//             <h3>ساحل وزیو</h3>
//           </div>
//           <div className="destination-card">
//             <img
//               src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
//               alt="پاریس"
//             />
//             <h3>پاریس، فرانسه</h3>
//           </div>
//           <div className="destination-card">
//             <img
//               src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
//               alt="ایتالیا"
//             />
//             <h3>آمالفی، ایتالیا</h3>
//           </div>
//         </div>
//       </section>

//       {/* فوتر */}
//       <footer className="footer">
//         © 2025 - همه حقوق محفوظ است
//       </footer>
//     </div>
//   );
// }
import React, { useEffect, useState, useMemo } from "react";
import axiosClient from "../api/axiosClient";
import "./Landing.css";
import SearchBox from "../components/SearchBox";
import { baseURL } from "../api/base";

export default function Landing() {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // گرفتن همه تورها
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

  // استخراج مقاصد محبوب (اینجا مثال ساده: 3 مقصد یکتا اول)
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

  // گرفتن 3 ارزان ترین تور
  const cheapestTours = useMemo(() => {
    const sorted = [...allTours].sort((a, b) => a.price - b.price);
    return sorted.slice(0, 3);
  }, [allTours]);

  // گرفتن 3 گران ترین تور
  const mostExpensiveTours = useMemo(() => {
    const sorted = [...allTours].sort((a, b) => b.price - a.price);
    return sorted.slice(0, 3);
  }, [allTours]);

  if (loading) return <p>در حال بارگذاری...</p>;

  return (
    <div>
      {/* بخش هیرو */}
      <section className="hero">
        <div className="overlay">
          <h1>جهان را کشف کنید</h1>
          <p>سفر به زیباترین مقصد‌های دنیا با بهترین تورها</p>
          <button>مشاهده تورها</button>
        </div>
      </section>

      {/* جستجوی تور */}
      <SearchBox />

      {/* مقاصد محبوب */}
      <section className="destinations">
        <h2>مقاصد محبوب</h2>
        <div className="grid">
          {popularDestinations.map((dest) => (
            <div key={dest} className="destination-card">
              {/* اینجا بهتره عکس رو از تورهای مربوط به مقصد بگیری */}
              <img
                src={
                  allTours.find((tour) => tour.destination === dest)
                    ? `${baseURL}${
                        allTours.find((tour) => tour.destination === dest)
                          .images[0]?.url
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

      {/* ارزان ترین تورها */}
      <section className="cheap-tours">
        <h2>ارزان‌ترین تورها</h2>
        <div className="grid">
          {cheapestTours.map((tour) => (
            <div key={tour.tour_id} className="tour-card">
              <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />{" "}
              <h3>{tour.name}</h3>
              <p>مقصد: {tour.destination}</p>
              <p>قیمت: ${tour.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* گران ترین تورها */}
      <section className="expensive-tours">
        <h2>گران‌ترین تورها</h2>
        <div className="grid">
          {mostExpensiveTours.map((tour) => (
            <div key={tour.tour_id} className="tour-card">
              <img src={`${baseURL}${tour.images[0]?.url}`} alt={tour.name} />{" "}
              <h3>{tour.name}</h3>
              <p>مقصد: {tour.destination}</p>
              <p>قیمت: ${tour.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* فوتر */}
      <footer className="footer">© 2025 - همه حقوق محفوظ است</footer>
    </div>
  );
}
