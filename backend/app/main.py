from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
import time

for i in range(30):
    try:
        Base.metadata.create_all(bind=engine)
        break
    except Exception:
        time.sleep(1)

app = FastAPI()


@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "healthy"}