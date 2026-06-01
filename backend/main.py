import io
import os

import numpy as np
import tensorflow as tf
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

from recommendation import recommendation

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Konfigurasi
MODEL_PATH = "garbage_classifier_final.keras"
DATA_PATH = "garbage_classification"
IMG_SIZE = (224, 224)
CLASS_NAME = os.listdir(DATA_PATH)

# load model
model = tf.keras.models.load_model(MODEL_PATH)


# preprocessing Image
# preprocessing Image
def preprocessing(img_byte):
    img = Image.open(io.BytesIO(img_byte)).convert('RGB') 
    img = img.resize(IMG_SIZE)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, 0)
    return img_array


def postprocessing(pred_class):
    ORGANIC = ["biological", "cardboard", "paper"]
    ANORGANIC = ["clothes", "metal", "glass", "plastic", "shoes", "trash"]

    if pred_class in ORGANIC:
        return "organic"
    elif pred_class in ANORGANIC:
        return "anorganic"
    else:
        return "danger"


@app.get("/")
def read_root():
    return {"message": "API model Garbage Classifier"}


@app.post("/predict")
async def predict(file: UploadFile):
    contents = await file.read()

    img_array = preprocessing(contents)

    predictions = model.predict(img_array, verbose=0)
    predicted_class = CLASS_NAME[np.argmax(predictions)]
    confidence = round(float(100 * np.max(predictions)), 3)

    category = postprocessing(predicted_class)
    recom = recommendation(category)

    return {
        "filename": file.filename,
        "type": file.content_type,
        "class": predicted_class,
        "category": category,
        "score": confidence,
        "suggestion": recom,
    }