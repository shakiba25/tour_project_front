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
}) {
  console.log("destinations:", destinations);
  console.log("selectedDestinations:", selectedDestinations);
  console.log("setDateFrom:", setDateFrom);
  console.log("setNumOfDays:", setNumOfDays);

  const [showDestinations, setShowDestinations] = React.useState(true);

  return (
    <aside className="filter-box">
      <h3>فیلتر تورها</h3>

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
              <label key={dest}>
                <input
                  type="checkbox"
                  checked={selectedDestinations.includes(dest)}
                  onChange={() => toggleDestination(dest)}
                />
                {dest}
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
  );
}
