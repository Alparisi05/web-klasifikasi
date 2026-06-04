import tensorflow as tf

# Load model kamu
model = tf.keras.models.load_model("garbage_classifier_final.keras")

# Intip struktur internal model
print("=== STRUKTUR MODEL ===")
model.summary()

# Trik melihat label jika tersimpan di dalam layer pre-processing
try:
    for layer in model.layers:
        if hasattr(layer, 'class_names'):
            print("\n✅ Urutan kelas asli yang tersimpan di model:")
            print(layer.class_names)
except Exception as e:
    print("\nTidak ada metadata class_names langsung di layer.")