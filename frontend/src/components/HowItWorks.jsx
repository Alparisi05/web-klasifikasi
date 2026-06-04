import React from 'react';

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="cara-kerja">
      <div className="container">
        <div className="section-label">Cara Kerja</div>
        <h2 className="section-title">Tiga Langkah<br /><em>Sederhana</em></h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-icon">
              <i className="bi bi-camera-fill"></i>
            </div>
            <h3>Upload atau Foto</h3>
            <p>Ambil foto sampah langsung dari kamera atau unggah dari galeri perangkatmu.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-icon">
              <i className="bi bi-robot"></i>
            </div>
            <h3>Analisis AI</h3>
            <p>Model machine learning kami menganalisis gambar untuk mendeteksi jenis sampah.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-icon">
              <i className="fa-solid fa-arrows-spin"></i>
            </div>
            <h3>Hasil & Saran</h3>
            <p>Dapatkan hasil klasifikasi beserta panduan pengelolaan sampah yang tepat.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
