from pydantic import BaseModel
from datetime import datetime


class ServiceCreate(BaseModel):
    name: str
    description: str | None = None
    url: str
    category_id: int | None = None
    icon: str | None = None

class ServiceUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    url: str | None = None
    category_id: int | None = None
    icon: str | None = None



class ServiceResponse(ServiceCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True