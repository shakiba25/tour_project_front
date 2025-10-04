import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./TourFilterBox.css";

export default function TourFilterBox({
  destinations,
  selectedDestinations,
  toggleDestination,
  dateFrom,
  setDateFrom,
  priceRange,
  setPriceRange,
  absoluteMinPrice,
  absoluteMaxPrice,
  numOfDays,
  setNumOfDays,
  hotelStar,
  sethotelStar,
  destinationType, // 👈 اضافه کن
  setDestinationType, // 👈 اضافه کن
}) {
  console.log("destinations:", destinations);
  console.log("selectedDestinations:", selectedDestinations);
  console.log("setDateFrom:", setDateFrom);
  console.log("setNumOfDays:", hotelStar);
  console.log("sethotelStar:", setNumOfDays);

  const [showDestinations, setShowDestinations] = React.useState(true);

  return (
    <aside className="filter-box">
      {/* <h3>فیلتر تورها</h3> */}

      {/* نوع مقصد */}
      <div className="custom-input-days">
        <strong>نوع مقصد:</strong>
        <select
          value={destinationType} // 👈 مقدار انتخابی
          onChange={(e) => setDestinationType(e.target.value)}
          className="custom-input"
        >
          <option value="">همه</option>
          <option value="داخلی">داخلی</option>
          <option value="خارجی">خارجی</option>
        </select>
      </div>
      <hr />

      {/* مقصدها */}
      <div className="filter-section">
        <strong
          style={{ cursor: "pointer" }}
          onClick={() => setShowDestinations(!showDestinations)}
        >
          مقصدها {showDestinations ? "▲" : "▼"}
        </strong>
        {showDestinations && (
          <div className="filter-options destination-scroll">
            {destinations.map((dest) => (
              <label key={dest.name}>
                <input
                  type="checkbox"
                  checked={selectedDestinations.includes(dest.name)}
                  onChange={() => toggleDestination(dest.name)}
                />
                {dest.name}
              </label>
            ))}
          </div>
        )}
      </div>

      <hr />

      {/* تاریخ رفت */}
      <div className="filter-section">
        <strong>تاریخ رفت:</strong>
        <div className="date-picker-with-reset">
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={dateFrom}
            onChange={setDateFrom}
            inputClass="custom-input"
            placeholder="تاریخ رفت را انتخاب کنید"
            calendarPosition="bottom-right"
            format="YYYY/MM/DD"
            clearable
            style={{ width: "100%" }}
          />
          {dateFrom && (
            <button
              type="button"
              className="reset-btn"
              onClick={() => setDateFrom(null)}
              title="پاک کردن تاریخ"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <hr />

      {/* تعداد روزها */}
      <div className="custom-input-days">
        <strong>تعداد روزها:</strong>
        <input
          type="number"
          min="1"
          placeholder="مثلاً 7"
          value={numOfDays || ""}
          onChange={(e) => setNumOfDays(e.target.value)}
          className="custom-input"
        />
      </div>

      <hr />
      {/* تعداد ستاره هتل */}
      <div className="custom-input-days">
        <strong>هتل :</strong>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="ستاره های هتل"
          value={hotelStar || ""}
          onChange={(e) => sethotelStar(e.target.value)}
          className="custom-input"
        />
      </div>

      <hr />

      {/* قیمت */}
      <div className="filter-section">
        <strong>قیمت (تومان):</strong>
        <div style={{ marginTop: 15 }}>
          <Slider
            range
            min={absoluteMinPrice}
            max={absoluteMaxPrice}
            value={priceRange}
            onChange={setPriceRange}
          />
          <div style={{ marginTop: 10, fontSize: 14 }}>
            {priceRange[0]} تومان - {priceRange[1]} تومان
          </div>
        </div>
      </div>
    </aside>
  );
}
