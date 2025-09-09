import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";
import axiosClient from "../api/axiosClient";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState(""); // "" یعنی همه
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [stayDuration, setStayDuration] = useState("");
  const [hotelStar, setHotelStar] = useState("");

  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (selectedDestination) params.append("destination", selectedDestination);
    if (startDate) params.append("startDate", startDate.format("YYYY-MM-DD"));
    if (endDate) params.append("endDate", endDate.format("YYYY-MM-DD"));

    // تب فعال (داخلی/خارجی) هم اگه خواستی بفرست
    if (activeTab) params.append("type", activeTab);

    if (stayDuration) params.append("duration", stayDuration);
    if (hotelStar) params.append("hotelStar", hotelStar);
    // برو به صفحه لیست تورها با پارامترها
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
      // اگه چیزی انتخاب نشده، همه مقصدها رو نشون بده
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

          {/* تاریخ رفت با دکمه ریست */}
          <div className="form-item date-picker-wrapper">
            <label>تاریخ رفت</label>
            <div className="date-picker-with-reset">
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  console.log(
                    "تاریخ انتخاب‌شده رفت:",
                    date?.format?.("YYYY/MM/DD")
                  );
                }}
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

          {/* تاریخ برگشت با دکمه ریست */}
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



