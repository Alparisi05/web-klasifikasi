import React from 'react';

export default function Categories() {
  return (
    <section className="categories" id="tentang">
      <div className="container">
        <div className="section-label">Kategori Sampah</div>
        <h2 className="section-title">Yang Bisa<br /><em>Kami Kenali</em></h2>
        <div className="cat-grid">
          <div className="cat-card cat-organic">
            <div className="cat-emoji">
              <i className="fa-solid fa-seedling"></i>
            </div>
            <h3>Organik</h3>
            <p>Sampah yang berasal dari makhluk hidup dan dapat terurai secara alami.</p>
            <ul>
              <li>Sisa makanan & sayuran</li>
              <li>Daun dan ranting</li>
              <li>Kulit buah</li>
              <li>Kertas & kardus basah</li>
            </ul>
            <div className="cat-tag">
              <i className="fa-brands fa-pagelines"></i> Bisa dikompos
            </div>
          </div>
          <div className="cat-card cat-inorganic">
            <div className="cat-emoji">
              <i className="fa-solid fa-bottle-droplet"></i>
            </div>
            <h3>Anorganik</h3>
            <p>Sampah buatan manusia yang butuh waktu lama untuk terurai.</p>
            <ul>
              <li>Plastik & botol</li>
              <li>Kaca & logam</li>
              <li>Elektronik</li>
              <li>Kain sintetis</li>
            </ul>
            <div className="cat-tag">
              <i className="fa-solid fa-recycle"></i> Bisa didaur ulang
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
