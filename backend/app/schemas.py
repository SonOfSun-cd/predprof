from pydantic import BaseModel, EmailStr
from datetime import date
from .models import UserRole
from typing import Optional, List

class Api(BaseModel):
    diatante: float
    sh: int