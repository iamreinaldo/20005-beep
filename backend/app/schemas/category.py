

from datetime import datetime

from pydantic import BaseModel


class CategoryCreate(BaseModel):
    name: str
    icon: str | None = None


class CategoryUpdate(BaseModel):
    name: str | None = None
    icon: str | None = None


class CategoryResponse(CategoryCreate):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True