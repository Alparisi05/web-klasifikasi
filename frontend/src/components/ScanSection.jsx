import React, { useState, useEffect, useRef } from 'react';
import ResultCard from './ResultCard.jsx';
import LoadingOverlay from './LoadingOverlay.jsx';

export default function ScanSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [cameraStream, setCameraStream] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream, isCameraOpen]);

  const triggerFileInput = () => {
    if (previewUrl) return;
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      loadPreview(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      loadPreview(file);
    }
  };

  const loadPreview = (file) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPredictionResult(null);
  };

  const resetUpload = (e) => {
    if (e) e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    setPredictionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openCamera = (e) => {
    if (e) e.stopPropagation();
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        setCameraStream(stream);
      })
      .catch((err) => {
        console.error(err);
        alert('Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.');
        setIsCameraOpen(false);
      });
  };

  const closeCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], 'kamera.jpg', { type: 'image/jpeg' });
            loadPreview(file);
            closeCamera();
          }
        },
        'image/jpeg',
        0.92
      );
    }
  };

  const startClassification = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('https://alpa987-api-klasifikasi-sampah.hf.space/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server');
      }

      const data = await response.json();
      setIsLoading(false);
      setPredictionResult(data);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      alert('Terjadi kesalahan saat melakukan klasifikasi.');
    }
  };

  const fullReset = () => {
    resetUpload();
    const scanSection = document.getElementById('scan');
    if (scanSection) {
      scanSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="scan-section" id="scan">
      <div className="container">
        <div className="section-label">Mulai Sekarang</div>
        <h2 className="section-title">Klasifikasi<br /><em>Sampahmu</em></h2>

        <div className="scan-card">
          <div
            className={`upload-area ${isDragOver ? 'drag-over' : ''}`}
            id="uploadArea"
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div
                className="upload-preview"
                id="uploadPreview"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <img id="previewImg" src={previewUrl} alt="Preview" />
                <button className="change-btn" onClick={resetUpload}>
                  ✕ Ganti Gambar
                </button>
              </div>
            ) : (
              <div className="upload-idle" id="uploadIdle">
                <div className="upload-icon-wrap">
                  <div className="upload-icon">
                    <i className="bi bi-images"></i>
                  </div>
                </div>
                <p className="upload-title">Seret & lepas gambar di sini</p>
                <p className="upload-sub">atau klik untuk memilih dari galeri</p>
                <div className="upload-divider">
                  <span>atau</span>
                </div>
                <button className="btn-camera" onClick={openCamera}>
                  <span>
                    <i className="bi bi-camera-fill"></i>
                  </span>{' '}
                  Buka Kamera
                </button>
              </div>
            )}
          </div>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileSelect}
          />

          {isCameraOpen && (
            <div className="camera-modal" id="cameraModal" style={{ display: 'flex' }}>
              <div className="camera-inner">
                <div className="camera-header">
                  <span>Kamera</span>
                  <button onClick={closeCamera}>✕</button>
                </div>
                <video ref={videoRef} id="cameraVideo" autoPlay playsInline></video>
                <div className="camera-controls">
                  <button className="btn-capture" onClick={capturePhoto}>
                    <i className="fa-solid fa-camera"></i> Ambil Foto
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="scan-action">
            <button
              className="btn-scan"
              id="btnScan"
              onClick={startClassification}
              disabled={!selectedFile}
            >
              <span className="btn-scan-icon">
                <i className="bi bi-search"></i>
              </span>
              <span>Klasifikasi Sekarang</span>
            </button>
            <p className="scan-note">Gambar tidak disimpan di server kami</p>
          </div>
        </div>

        {predictionResult && (
          <ResultCard data={predictionResult} onReset={fullReset} />
        )}
      </div>

      <LoadingOverlay active={isLoading} />
    </section>
  );
}
