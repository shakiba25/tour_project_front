import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Header.css"
function Header() {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  return (
    <header className={`main-header ${isLandingPage ? 'fixed' : ''}`}>
      <div className="logo">آسمان تور</div>
      <nav>
        <a href="/">صفحه اصلی </a>
        <a href="#">درباره ما </a>
        <a href="/tours">تور‌ها</a>
        <a href="#">تماس</a>
      </nav>
      <button>ورود</button>
    </header>
  );
}

export default Header;
