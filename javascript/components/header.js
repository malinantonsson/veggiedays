import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Link to="/" className="header__logo">
          <span className="header__logo-link">Home</span>
        </Link>

        <div className="header__login">
          <button className="header__login-link">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
