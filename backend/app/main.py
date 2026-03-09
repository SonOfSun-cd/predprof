from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, get_db
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas
import time

for i in range(30):
    try:
        Base.metadata.create_all(bind=engine)
        break
    except Exception:
        print("huyna")
        time.sleep(1)

app = FastAPI()

from .set_models import done

@app.get("/api/get_data", response_model = List[schemas.API])
def get_data(
    db: Session = Depends(get_db),
 ):
    data = db.query(models.API).all()
    print(data)
    return data


@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
def health():
    return {"status": "healthy"}