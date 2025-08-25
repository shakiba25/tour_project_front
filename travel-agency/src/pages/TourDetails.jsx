// src/pages/TourDetails.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TourDetails.css";

const TourDetails = () => {
  const tour = {
    tour_id: "tour_001",
    name: "تور 3 روزه کیش",
    destination: "کیش",
    duration_days: 3,
    price: 200,
    departure: { date: "2025-08-15", time: "08:30" ,airline:"mahan"  },  //airline:"mahan"
    return: { date: "2025-08-18", time: "18:45" , airline:"iranair"}, // , airline:"mahan"
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
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    rtl: false,
    adaptiveHeight: true,
  };

  return (
    <div className="tour-container">
      <div className="tour-header">
        <div className="tour-slider">
          <Slider {...sliderSettings}>
            {tour.images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`slide-${index}`} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="tour-info">
          <h1>{tour.name}</h1>
          <p>
            <strong>مقصد:</strong> {tour.destination}
          </p>
          <p>
            <strong>مدت سفر:</strong> {tour.duration_days} روز
          </p>
          <p>
            <strong>قیمت:</strong> {tour.price} تومان
          </p>
        </div>
      </div>

      <div className="tour-box">
        <section className="hotel-flight with-header">
          <div className="section-header">✈ اطلاعات کلی</div>
          <h2>🏨 هتل</h2>
          <p>
            {tour.hotel.name} {"⭐".repeat(tour.hotel.star)}
          </p>
          <div class="divider2"></div>
          <h2>✈ پرواز</h2>
          <p>
            تاریخ رفت: {tour.departure.date}  - ساعت {tour.departure.time} - ایرلاین: {tour.departure.airline} 
          </p>
          <p>
            تاریخ برگشت: {tour.return.date} - ساعت {tour.return.time} - ایرلاین: {tour.return.airline} 
          </p>
          
          <div class="divider2"></div>
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
                {tour.services.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="divider"></div>

            <div className="column">
              <ul>
                {tour.itinerary.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="notes with-header">
          <div className="section-header">📌 اطلاعات تکمیلی</div>
          <div className="rich" dangerouslySetInnerHTML={{ __html: tour.rich_text }} />
        </section>
      </div>
    </div>
  );
};

export default TourDetails;
