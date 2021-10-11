import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MobileMenu() {
  const [state, setState] = useState(false);

  function toggleMenu() {
    const links = document.querySelector('.mobileMenu__links');
    if (links.style.display === 'block') {
      links.style.display = 'none';
    } else {
      links.style.display = 'none';
    }
  }

  return (
    <div className="mobileMenu">
      <div className="mobileMenu__links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/write">Write</Link>
        <Link to="/">Sign in</Link>
        <Link to="/register">Sign Up</Link>
      </div>
      <a className=" mobileMenu__icon" onClick={toggleMenu}>
        <i className="fa fa-bars"></i>
      </a>
    </div>
  );
}
