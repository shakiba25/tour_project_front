import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header"; // فرض اینکه مسیر فایل Header اینه
import Landing from "./pages/Landing";
import TourDetails from "./pages/TourDetails";
import TourList from "./pages/TourList";

export default function App() {
  return (
    <BrowserRouter>
      <Header /> {/* ✅ هدر در همه صفحات نمایش داده میشه */}
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/1" element={<TourList />} />
        <Route path="/tours/1" element={<TourDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
