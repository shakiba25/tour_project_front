import "./Landing.css";
import SearchBox from "../components/SearchBox";

export default function Landing() {
  return (
    <div>
      {/* هدر
      <header className="header">
        <div className="logo">Logo</div>
        <nav>
          <a href="#">صفحه اصلی</a>
          <a href="#">درباره ما</a>
          <a href="#">تور‌ها</a>
          <a href="#">تماس</a>
        </nav>
        <button>ورود</button>
      </header> */}

      {/* بخش هیرو */}
      <section className="hero">
        <div className="overlay">
          <h1>جهان را کشف کنید</h1>
          <p>سفر به زیباترین مقصد‌های دنیا با بهترین تورها</p>
          <button>مشاهده تورها</button>
        </div>


      </section>

      
        
        {/* 🔹 جستجوی تور */}
      <SearchBox />


      {/* مقاصد محبوب */}
      <section className="destinations">
        <h2>مقاصد محبوب</h2>
        <div className="grid">
          <div className="destination-card">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="ساحل"
            />
            <h3>ساحل وزیو</h3>
          </div>
          <div className="destination-card">
            <img
              src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad"
              alt="پاریس"
            />
            <h3>پاریس، فرانسه</h3>
          </div>
          <div className="destination-card">
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
              alt="ایتالیا"
            />
            <h3>آمالفی، ایتالیا</h3>
          </div>
        </div>
      </section>

      {/* فوتر */}
      <footer className="footer">
        © 2025 - همه حقوق محفوظ است
      </footer>
    </div>
  );
}
