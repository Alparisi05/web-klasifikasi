import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-leaf">
            <img src="/assets/logo baru.png" alt="Logo" />
          </span>
          <span className="footer-name">Sortfy</span>
          <p>Sistem Klasifikasi Sampah Berbasis Web <br />Dibuat untuk lingkungan yang lebih baik</p>
        </div>
        <p className="footer-note"></p>
      </div>
    </footer>
  );
}
