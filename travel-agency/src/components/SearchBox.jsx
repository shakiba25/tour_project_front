import { useState } from "react";
import "./SearchBox.css";

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState("international");

  return (
    <div className="search-box">
      {/* تب‌ها */}
      <div className="search-tabs">
        <div
          className={`search-tab ${
            activeTab === "international" ? "active" : ""
          }`}
          onClick={() => setActiveTab("international")}
        >
          🌍 تورهای خارجی
        </div>
        <div
          className={`search-tab ${
            activeTab === "domestic" ? "active" : ""
          }`}
          onClick={() => setActiveTab("domestic")}
        >
          🏞 تورهای داخلی
        </div>
      </div>

      {/* فرم سرچ */}
      <form className="search-form">
        <div className="form-row">
          <div className="form-item">
            <label>مبدا</label>
            <select>
              <option>همه</option>
              <option>تهران</option>
              <option>مشهد</option>
              <option>شیراز</option>
            </select>
          </div>

          <div className="form-item">
            <label>مقصد</label>
            <select>
              <option>همه</option>
              <option>استانبول</option>
              <option>دبی</option>
              <option>پاریس</option>
            </select>
          </div>

          <div className="form-item">
            <label>تاریخ رفت</label>
            <input type="date" />
          </div>

          <div className="form-item">
            <label>تاریخ برگشت</label>
            <input type="date" />
          </div>

          <div className="form-item">
            <label>مدت اقامت</label>
            <select>
              <option>3 شب</option>
              <option>5 شب</option>
              <option>7 شب</option>
            </select>
          </div>

          <div className="form-item">
            <label>هتل</label>
            <select>
              <option>همه</option>
              <option>3 ستاره</option>
              <option>4 ستاره</option>
              <option>5 ستاره</option>
            </select>
          </div>

          <div className="form-item">
            <button type="submit" className="search-btn">
              جستجو
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
