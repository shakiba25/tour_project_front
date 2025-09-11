// // src/pages/TourDetails.jsx
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./TourDetails.css";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axiosClient  from "../api/axiosClient";
// import { baseURL } from "../api/base"

// const TourDetails = () => {

//   const { pk } = useParams();
//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTour = async () => {
//       try {
//         const res = await axiosClient.get(`/tours/${pk}/`);
//         setTour(res.data);
//         console.log(res.data);
//       } catch (err) {
//         setError("تور مورد نظر پیدا نشد.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTour();
//   }, [pk]);

//   if (loading) return <p>در حال بارگذاری...</p>;
//   if (error) return <p>{error}</p>;
//   if (!tour) return null;

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     rtl: false,
//     adaptiveHeight: true,
//   };

//   return (
//     <div className="tour-container">
//       <div className="tour-header">
//         <div className="tour-slider">
//           <Slider {...sliderSettings}>
//             {tour.images?.map((img, index) => (
//               <div key={index}>
//                 <img src={`${baseURL}${img.url}`} alt={`slide-${index}`} />
//               </div>
//             ))}
//           </Slider>
//         </div>

//         <div className="tour-info">
//           <h1>{tour.name}</h1>
//           <p>
//             <strong>مقصد:</strong> {tour.destination}
//           </p>
//           <p>
//             <strong>نوع:</strong> {tour.destination_type}
//           </p>
//           <p>
//             <strong>مدت سفر:</strong> {tour.duration_days} روز
//           </p>
//           <p>
//             <strong>قیمت:</strong> {tour.price} تومان
//           </p>
//         </div>
//       </div>

//       <div className="tour-box">
//         <section className="hotel-flight with-header">
//           <div className="section-header">✈ اطلاعات کلی</div>

//           <h2>🏨 هتل</h2>
//           <p>
//             {tour.hotel?.name || "نامشخص"} {"⭐".repeat(tour.hotel?.star || 0)}
//           </p>

//           <div className="divider2"></div>

//           <h2>✈ پرواز</h2>
//           <p>
//             تاریخ رفت: {tour.departure?.date_jalali || "نامشخص"} - ساعت{" "}
//             {tour.departure?.time || "نامشخص"} - ایرلاین:{" "}
//             {tour.departure?.airline || "نامشخص"}
//           </p>
//           <p>
//             تاریخ برگشت: {tour.return_info?.date_jalali || "نامشخص"} - ساعت{" "}
//             {tour.return_info?.time || "نامشخص"} - ایرلاین:{" "}
//             {tour.return_info?.airline || "نامشخص"}
//           </p>

//           <div className="divider2"></div>

//           <h2>🛡 بیمه</h2>
//           <p>
//             {tour.insurance_included
//               ? "این تور شامل بیمه میشود."
//               : "این تور بیمه ای ندارد."}
//           </p>
//         </section>

//         <section className="services-itinerary with-header">
//           <div className="header-row">
//             <div className="header-col">🛎 خدمات</div>
//             <div className="header-col">🗺 برنامه بازدید</div>
//           </div>

//           <div className="content-row">
//             <div className="column">
//               <ul>
//                 {Array.isArray(tour.services) &&
//                   tour.services.map((s, i) => (
//                     <li key={i}>
//                       {typeof s === "string"
//                         ? s
//                         : s?.name || s?.title || "خدمات نامشخص"}
//                     </li>
//                   ))}
//               </ul>
//             </div>

//             <div className="divider"></div>

//             <div className="column">
//               <ul>
//                 {Array.isArray(tour.itinerary) &&
//                   tour.itinerary.map((it, i) => (
//                     <li key={i}>
//                       {typeof it === "string"
//                         ? it
//                         : it?.title || it?.description || "برنامه نامشخص"}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           </div>
//         </section>

//         <section className="notes with-header">
//           <div className="section-header">📌 اطلاعات تکمیلی</div>
//           <div
//             className="rich"
//             dangerouslySetInnerHTML={{ __html: tour.rich_text || "" }}
//           />
//         </section>
//       </div>
//     </div>
//   );
// };

// export default TourDetails;







/////////////////////////


// src/pages/TourDetails.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TourDetails.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";
import { baseURL } from "../api/base";

const TourDetails = () => {
  const { pk } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axiosClient.get(`/tours/${pk}/`);
        setTour(res.data);
      } catch (err) {
        setError("تور مورد نظر پیدا نشد.");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [pk]);

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>{error}</p>;
  if (!tour) return null;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    rtl: false,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <div className="tour-page">
      {/* 🔹 تصاویر تور به عنوان پس‌زمینه */}
      <div className="background-slider">
        <Slider {...sliderSettings}>
          {tour.images?.map((img, index) => (
            <div key={index} className="bg-slide">
              <img src={`${baseURL}${img.url}`} alt={`slide-${index}`} />
            </div>
          ))}
        </Slider>
      </div>

      {/* 🔹 محتوای روی پس‌زمینه */}
      <div className="tour-overlay">
        <div className="tour-info-glass">
          <h1>{tour.name}</h1>
          <p><strong>مقصد:</strong> {tour.destination}</p>
          <p><strong>نوع:</strong> {tour.destination_type}</p>
          <p><strong>مدت سفر:</strong> {tour.duration_days} روز</p>
          <p><strong>قیمت:</strong> {tour.price} تومان</p>
        </div>

        <div className="tour-box-glass">
          <section className="hotel-flight with-header">
            <div className="section-header">✈ اطلاعات کلی</div>
            <h2>🏨 هتل</h2>
            <p>
              {tour.hotel?.name || "نامشخص"} {"⭐".repeat(tour.hotel?.star || 0)}
            </p>
            <div className="divider2"></div>
            <h2>✈ پرواز</h2>
            <p>
              تاریخ رفت: {tour.departure?.date_jalali || "نامشخص"} - ساعت{" "}
              {tour.departure?.time || "نامشخص"} - ایرلاین:{" "}
              {tour.departure?.airline || "نامشخص"}
            </p>
            <p>
              تاریخ برگشت: {tour.return_info?.date_jalali || "نامشخص"} - ساعت{" "}
              {tour.return_info?.time || "نامشخص"} - ایرلاین:{" "}
              {tour.return_info?.airline || "نامشخص"}
            </p>
            <div className="divider2"></div>
            <h2>🛡 بیمه</h2>
            <p>
              {tour.insurance_included
                ? "این تور شامل بیمه میشود."
                : "این تور بیمه ای ندارد."}
            </p>
          </section>

          <section className="services-itinerary with-header">
            <div className="header-row">
              <div className="header-col">🛎 خدمات</div>
              <div className="header-col">🗺 برنامه بازدید</div>
            </div>
            <div className="content-row">
              <div className="column">
                <ul>
                  {Array.isArray(tour.services) &&
                    tour.services.map((s, i) => (
                      <li key={i}>
                        {typeof s === "string"
                          ? s
                          : s?.name || s?.title || "خدمات نامشخص"}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="divider"></div>
              <div className="column">
                <ul>
                  {Array.isArray(tour.itinerary) &&
                    tour.itinerary.map((it, i) => (
                      <li key={i}>
                        {typeof it === "string"
                          ? it
                          : it?.title || it?.description || "برنامه نامشخص"}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="notes with-header">
            <div className="section-header">📌 اطلاعات تکمیلی</div>
            <div
              className="rich"
              dangerouslySetInnerHTML={{ __html: tour.rich_text || "" }}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
