import React from 'react';
import { NavLink } from 'react-router-dom'; // اگر داری React Router استفاده می‌کنی

function Header() {
  return (
      <header className="header">
        <div className="logo">Logo</div>
        <nav>
          <a href="#"> صفحه اصلی </a>
          <a href="#">درباره ما</a>
          <a href="#">تور‌ها</a>
          <a href="#">تماس</a>
        </nav>
        <button>ورود</button>
      </header>
  );
}

export default Header;
