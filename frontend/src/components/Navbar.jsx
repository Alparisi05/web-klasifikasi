import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="nav" style={{ boxShadow: scrolled ? '0 2px 20px rgba(45,90,61,.1)' : 'none' }}>
      <div className="nav-inner">
        <a href="#" className="logo">
          <span className="logo-leaf">
            <img src="/assets/logo baru.png" alt="Logo" />
          </span>
          <span>Sortfy</span>
        </a>
        <ul className="nav-links">
        </ul>
      </div>
    </nav>
  );
}
