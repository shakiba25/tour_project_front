// components/TourFilterBox.jsx

import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

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
}) {
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
          <div className="filter-options">
            {destinations.map((dest) => (
              <label key={dest}>
                <input
                  type="checkbox"
                  checked={selectedDestinations.includes(dest)}
                  onChange={() => toggleDestination(dest)}
                />{" "}
                {dest}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* تاریخ رفت */}
      <div className="filter-section">
        <strong>نمایش از تاریخ:</strong>
        <DatePicker
          value={dateFrom}
          onChange={setDateFrom}
          calendar={persian}
          locale={persian_fa}
          style={{ width: "100%", marginTop: 8 }}
          inputClass="custom-input"
        />
      </div>

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
