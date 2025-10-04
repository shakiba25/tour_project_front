import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";
import axiosClient from "../api/axiosClient";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState(""); // "", "domestic", "international"
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [stayDuration, setStayDuration] = useState("");
  const [hotelStar, setHotelStar] = useState("");

  const navigate = useNavigate();

  function toEnglishNumber(str) {
    if (!str) return str;
    return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
  }

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (selectedDestination) params.append("destination", selectedDestination);

    // مپینگ نوع مقصد
    const destinationTypeMap = {
      domestic: "داخلی",
      international: "خارجی",
    };

    if (activeTab)
      params.append("destination_type", destinationTypeMap[activeTab]);

    // if (startDate) params.append("startDate", startDate.format("YYYY-MM-DD"));
   if (startDate) {
      const startDateFormatted = startDate.format("YYYY-MM-DD");
      params.append("startDate", toEnglishNumber(startDateFormatted));
    }

    if (endDate) params.append("endDate", endDate.format("YYYY-MM-DD"));

    if (stayDuration) params.append("duration", stayDuration);
    if (hotelStar) params.append("hotelStar", hotelStar);

    // برو به صفحه لیست تورها با پارامترها
    console.log(`/tours?${params.toString()}`);
    navigate(`/tours?${params.toString()}`);
  };

  useEffect(() => {
    axiosClient
      .get("/destinations/")
      .then((response) => {
        setDestinations(response.data);
        setFilteredDestinations(response.data); // در ابتدا همه رو نشون بده
      })
      .catch((error) => {
        console.error("خطا در دریافت مقصدها:", error);
      });
  }, []);

  // فیلتر کردن مقصدها طبق activeTab
  useEffect(() => {
    if (!activeTab) {
      setFilteredDestinations(destinations);
    } else if (activeTab === "domestic") {
      setFilteredDestinations(
        destinations.filter((item) => item.destination_type === "داخلی")
      );
    } else if (activeTab === "international") {
      setFilteredDestinations(
        destinations.filter((item) => item.destination_type === "خارجی")
      );
    }
  }, [activeTab, destinations]);

  return (
    <div className="search-box">
      {/* تب‌ها */}
      <div className="search-tabs">
        <div
          className={`search-tab ${activeTab === "" ? "active" : ""}`}
          onClick={() => setActiveTab("")}
        >
          🌐 همه تورها
        </div>
        <div
          className={`search-tab ${
            activeTab === "international" ? "active" : ""
          }`}
          onClick={() => setActiveTab("international")}
        >
          🌍 تورهای خارجی
        </div>
        <div
          className={`search-tab ${activeTab === "domestic" ? "active" : ""}`}
          onClick={() => setActiveTab("domestic")}
        >
          🏞 تورهای داخلی
        </div>
      </div>

      {/* فرم سرچ */}
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-row">
          <div className="form-item">
            <label>مقصد</label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
            >
              <option value="">همه</option>
              {filteredDestinations.map((item, index) => (
                <option key={index} value={item.destination}>
                  {item.destination}
                </option>
              ))}
            </select>
          </div>

          {/* تاریخ رفت */}
          <div className="form-item date-picker-wrapper">
            <label>تاریخ رفت</label>
            <div className="date-picker-with-reset">
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={startDate}
                onChange={(date) => setStartDate(date)}
                inputClass="custom-input2"
                placeholder="تاریخ رفت را انتخاب کنید"
                calendarPosition="bottom-right"
                format="YYYY/MM/DD"
                clearable
              />
              {startDate && (
                <button
                  type="button"
                  className="reset-btn"
                  onClick={() => setStartDate(null)}
                  title="پاک کردن تاریخ"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* تاریخ برگشت */}
          <div className="form-item date-picker-wrapper">
            <label>تاریخ برگشت</label>
            <div className="date-picker-with-reset">
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={endDate}
                onChange={setEndDate}
                inputClass="custom-input2"
                placeholder="تاریخ برگشت را انتخاب کنید"
                calendarPosition="bottom-right"
                format="YYYY/MM/DD"
                clearable
              />
              {endDate && (
                <button
                  type="button"
                  className="reset-btn"
                  onClick={() => setEndDate(null)}
                  title="پاک کردن تاریخ"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* مدت اقامت */}
          <div className="form-item">
            <label>مدت اقامت</label>
            <select
              value={stayDuration}
              onChange={(e) => setStayDuration(e.target.value)}
            >
              <option value="">همه</option>
              <option value="2">2 شب</option>
              <option value="3">3 شب</option>
              <option value="4">4 شب</option>
              <option value="5">5 شب</option>
              <option value="6">6 شب</option>
              <option value="7">7 شب</option>
              <option value="8">8 شب</option>
              <option value="9">9 شب</option>
            </select>
          </div>

          {/* هتل */}
          <div className="form-item">
            <label>هتل</label>
            <select
              value={hotelStar}
              onChange={(e) => setHotelStar(e.target.value)}
            >
              <option value="">همه</option>
              <option value="3">3 ستاره</option>
              <option value="4">4 ستاره</option>
              <option value="5">5 ستاره</option>
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
