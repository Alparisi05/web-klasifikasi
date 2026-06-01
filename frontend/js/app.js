let selectedFile = null;
let cameraStream  = null;

function scrollToScan() {
  document.getElementById('scan').scrollIntoView({ behavior: 'smooth' });
}

function triggerFileInput() {
  if (document.getElementById('uploadPreview').style.display !== 'none') return;
  document.getElementById('fileInput').click();
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) loadPreview(file);
}

function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('uploadArea').classList.add('drag-over');
}
function handleDragLeave() {
  document.getElementById('uploadArea').classList.remove('drag-over');
}
function handleDrop(e) {
  e.preventDefault();
  document.getElementById('uploadArea').classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadPreview(file);
}

function loadPreview(file) {
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('previewImg').src = ev.target.result;
    document.getElementById('uploadIdle').style.display    = 'none';
    document.getElementById('uploadPreview').style.display = 'flex';
    document.getElementById('uploadPreview').style.flexDirection = 'column';
    document.getElementById('uploadPreview').style.alignItems    = 'center';
    document.getElementById('uploadPreview').style.gap = '12px';
    document.getElementById('btnScan').disabled = false;
    document.getElementById('resultCard').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function resetUpload(e) {
  e.stopPropagation();
  selectedFile = null;
  document.getElementById('fileInput').value = '';
  document.getElementById('uploadIdle').style.display    = 'block';
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('btnScan').disabled = true;
  document.getElementById('resultCard').style.display = 'none';
}

function openCamera(e) {
  e.stopPropagation();
  const modal = document.getElementById('cameraModal');
  modal.style.display = 'flex';
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      cameraStream = stream;
      document.getElementById('cameraVideo').srcObject = stream;
    })
    .catch(() => {
      alert('Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.');
      modal.style.display = 'none';
    });
}

function closeCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
  document.getElementById('cameraModal').style.display = 'none';
}

function capturePhoto() {
  const video = document.getElementById('cameraVideo');
  const canvas = document.createElement('canvas');
  canvas.width  = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  canvas.toBlob(blob => {
    const file = new File([blob], 'kamera.jpg', { type: 'image/jpeg' });
    loadPreview(file);
    closeCamera();
  }, 'image/jpeg', 0.92);
}

async function startClassification() {
  if (!selectedFile) return;

  showLoading(true);

  try {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Gagal menghubungi server');
    }

    const data = await response.json();

    showLoading(false);
    showResult(data);

  } catch (error) {
    showLoading(false);
    console.error(error);
    alert('Terjadi kesalahan saat melakukan klasifikasi.');
  }
}

// contoh simulasi dulu
function getMockResult() {
  const samples = [
    {
      type: 'organic', label: 'Organik', emoji: '\uD83C\uDF33',
      confidence: 0.91,
      subcategory: 'Sisa makanan / bahan dapur',
      description: 'Gambar menunjukkan sampah organik yang berasal dari bahan alami. Jenis sampah ini dapat terurai secara alami dalam waktu relatif singkat dan bermanfaat jika diolah dengan tepat.',
      tips: [
        'Buat kompos di rumah menggunakan wadah tertutup',
        'Campurkan dengan tanah untuk pupuk alami',
        'Hindari membuang ke tempat sampah umum yang tercampur',
        'Pisahkan dari sampah anorganik sejak awal',
      ]
    },
    {
      type: 'inorganic', label: 'Anorganik', emoji: '\uD83E\uDDF4',
      confidence: 0.86,
      subcategory: 'Plastik / kemasan',
      description: 'Gambar menunjukkan sampah anorganik yang umumnya terbuat dari bahan sintetis. Sampah jenis ini membutuhkan ratusan tahun untuk terurai dan sebaiknya didaur ulang atau dikelola dengan benar.',
      tips: [
        'Bersihkan sebelum membuang agar lebih mudah didaur ulang',
        'Kumpulkan dan serahkan ke bank sampah terdekat',
        'Cari tahu simbol daur ulang pada kemasan (kode 1–7)',
        'Pertimbangkan untuk digunakan ulang (reuse) jika memungkinkan',
      ]
    }
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}

function showResult(data) {
  const card = document.getElementById('resultCard');
  card.style.display = 'block';

  const isOrganic = data.category === 'organic';

  const badge = document.getElementById('resultBadge');
  badge.textContent = isOrganic ? '🌳' : '🧴';
  badge.className = 'result-badge ' + (isOrganic ? 'organic' : 'inorganic');

  document.getElementById('resultType').textContent =
    data.class || '-';

  document.getElementById('resultDesc').textContent =
    data.suggestion || 'Tidak ada rekomendasi tersedia.';

  const pct = Math.round(data.score || 0);

  document.getElementById('confidenceText').textContent =
    pct + '%';

  const circumference = 2 * Math.PI * 24;
  const offset = circumference - (pct / 100) * circumference;

  document.getElementById('confidenceCircle').style.strokeDashoffset =
    offset;

  const ul = document.getElementById('resultTips');
  ul.innerHTML = '';

  const li1 = document.createElement('li');
  li1.textContent = 'Kategori: ' + data.category;
  ul.appendChild(li1);

  const li2 = document.createElement('li');
  li2.textContent = 'Tingkat keyakinan model: ' + pct + '%';
  ul.appendChild(li2);

  const sub = document.getElementById('resultSubcategory');

  sub.textContent =
    '📁 Hasil klasifikasi: ' + data.class;

  sub.style.display = 'block';

  card.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
}

function fullReset() {
  resetUpload({ stopPropagation: () => {} });
  document.getElementById('resultCard').style.display = 'none';
  document.getElementById('scan').scrollIntoView({ behavior: 'smooth' });
}

function showLoading(state) {
  document.getElementById('loadingOverlay').style.display = state ? 'flex' : 'none';
}

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(45,90,61,.1)' : 'none';
});