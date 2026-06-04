import React from 'react';

export default function LoadingOverlay({ active }) {
  if (!active) return null;

  return (
    <div className="loading-overlay" id="loadingOverlay">
      <div className="loading-box">
        <div className="loading-spinner"></div>
        <p>Menganalisis gambar...</p>
        <span>Mohon tunggu sebentar</span>
      </div>
    </div>
  );
}
