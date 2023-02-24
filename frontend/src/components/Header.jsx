import React from "react";
import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";

export default function Header() {
  return (
    <header className="header d-flex justify-content-between align-items-center fixed-top">
      <div className="d-flex">
        <Link to={'/'} className="d-flex align-items-center">
          <img src='/logo192.png' alt='logo' width={28} height={28} />
        </Link>
      </div>
      <div className="d-flex align-items-center">
        <Link to={'/login'} className="header-link">Log in</Link>
        <Link to={'/register'} className="header-link me-1">Sign up</Link>
        <ThemeButton />
      </div>
    </header>
  );
}
