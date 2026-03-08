import React from 'react';
import './style-navbar.css';

export const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img className="logo" src="/wikilogo.png" alt="Logo" />
      </div>
      <nav className="navbar-links">
        <span className="nav-link" onClick={() => window.location.reload()}>PERSONAGENS</span>
      </nav>
    </header>
  );
};
