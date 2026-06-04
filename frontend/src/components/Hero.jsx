import React from 'react';

export default function Hero() {
  const scrollToScan = () => {
    const scanSection = document.getElementById('scan');
    if (scanSection) {
      scanSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="hero-content">
        <div className="badge">Cerdas Memilah, Lebih Hijau</div>
        <h1 className="hero-title">
          Kenali Sampahmu,<br />
          <em>Selamatkan Bumi</em>
        </h1>
        <p className="hero-desc">
          Foto sampahmu, dan biarkan AI kami membantu menentukan jenisnya
          sekaligus cara terbaik untuk mengelolanya.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={scrollToScan}>
            <span><i className="bi bi-camera"></i></span> Mulai Klasifikasi
          </button>
          <a href="#cara-kerja" className="btn-ghost">Pelajari Lebih →</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>2 Kategori</strong><span>Organik & Anorganik</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><strong>Gratis</strong><span>Tanpa biaya</span></div>
          <div className="stat-divider"></div>
          <div className="stat"><strong>Mudah</strong><span>Foto langsung hasil</span></div>
        </div>
      </div>
      <div className="hero-visual">
        <img src="/assets/pohon.png" className="hero-tree-img" alt="Pohon EcoScan" />
      </div>
    </section>
  );
}
