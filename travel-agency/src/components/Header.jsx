// import React from "react";
// import { useLocation } from "react-router-dom";
// import "./Header.css";

// function Header() {
//   const location = useLocation();

//   const isLandingPage = location.pathname === "/";

//   return (
//     <header className={`main-header ${isLandingPage ? "fixed" : ""}`}>
//       <div className="logo">آسمان تور</div>
//       <nav>
//         <a href="/">صفحه اصلی </a>
//         <a href="/?scrollTo=about-us">درباره ما </a>
//         <a href="/tours">تور‌ها</a>
//         <a href="/?scrollTo=contact-us">تماس</a>
//       </nav>
//       {/* <button>ورود</button> */}
//     </header>
//   );
// }

// export default Header;
import { useNavigate } from "react-router-dom";
import "./Header.css";
function Header() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate(`/?scrollTo=${id}`);
  };

  return (
    <header className="main-header fixed">
      <div className="logo">آسمان تور</div>
      <nav>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}> صفحه اصلی</a>
        <a href="/?scrollTo=about-us" onClick={(e) => { e.preventDefault(); scrollToSection("about-us"); }}> درباره ما </a>
        <a href="/tours">تور‌ها</a>
        <a href="/?scrollTo=contact-us" onClick={(e) => { e.preventDefault(); scrollToSection("contact-us"); }}>تماس</a>
      </nav>
    </header>
  );
}
export default Header;
