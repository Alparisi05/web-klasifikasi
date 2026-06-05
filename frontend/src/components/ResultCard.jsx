import React, { useEffect, useRef } from 'react';

export default function ResultCard({ data, onReset }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (data && cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [data]);

  if (!data) return null;

  const pct = Math.round(data.score || 0);
  const circumference = 2 * Math.PI * 24;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  let badgeEmoji = '⚠️';
  let badgeClass = 'result-badge danger';

  if (data.category === 'organic') {
    badgeEmoji = '🌳';
    badgeClass = 'result-badge organic';
  } else if (data.category === 'anorganic') {
    badgeEmoji = '🧴';
    badgeClass = 'result-badge inorganic';
  }

  return (
    <div className="result-card" id="resultCard" ref={cardRef}>
      <div className="result-header">
        <div className={badgeClass} id="resultBadge">
          {badgeEmoji}
        </div>
        <div className="result-title-wrap">
          <p className="result-label">Hasil Klasifikasi</p>
          <h3 className="result-type" id="resultType">
            {data.category || '-'}
          </h3>
        </div>
        <div className="result-confidence">
          <div className="confidence-ring">
            <svg viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="#e8ede4" strokeWidth="5" />
              <circle
                cx="30"
                cy="30"
                r="24"
                fill="none"
                stroke="#4a7c59"
                strokeWidth="5"
                strokeDasharray="150.8"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 30 30)"
                id="confidenceCircle"
              />
            </svg>
            <span id="confidenceText">{pct}%</span>
          </div>
          <p>Akurasi</p>
        </div>
      </div>
      <p className="result-desc" id="resultDesc">
        {data.suggestion || 'Tidak ada rekomendasi tersedia.'}
      </p>

      <div className="result-tips">
        <h4>Kategori Sampah</h4>
        <ul id="resultTips">
          <li>Jenis: {data.class}</li>
          <li>Tingkat keyakinan model: {pct}%</li>
        </ul>
      </div>

      <div className="result-subcategory" id="resultSubcategory" style={{ display: 'block' }}>
        📁 Hasil klasifikasi: {data.category}
      </div>

      <button className="btn-reset" onClick={onReset}>
        ↩ Scan Sampah Lain
      </button>
    </div>
  );
}
