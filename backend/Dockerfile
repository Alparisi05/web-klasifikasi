# 1. Gunakan versi Python resmi yang stabil
FROM python:3.10-slim

# 2. Atur folder kerja di dalam server
WORKDIR /code

# 3. Copy file requirements.txt dulu agar bisa diinstall library-nya
COPY ./requirements.txt /code/requirements.txt

# 4. Install semua library (termasuk tensorflow & fastapi)
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. Copy seluruh sisa codingan backend ke dalam server
COPY . .

# 6. Jalankan server FastAPI menggunakan Uvicorn di port 7860 (Port standar Hugging Face)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]