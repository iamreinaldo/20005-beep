from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.category import Category
from app.models.service import Service
from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate,
    CategoryResponse,
)

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.post("/", response_model=CategoryResponse)
def create_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    existing_category = db.query(Category).filter(
        Category.name == category.name.strip()
    ).first()

    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Category already exists"
        )

    db_category = Category(
        name=category.name.strip(),
        icon=category.icon,
    )

    db.add(db_category)
    db.commit()
    db.refresh(db_category)

    return db_category


@router.get("/", response_model=list[CategoryResponse])
def list_categories(
    db: Session = Depends(get_db)
):
    return db.query(Category).all()


@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    db_category = db.query(Category).filter(
        Category.id == category_id
    ).first()

    if not db_category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return db_category


@router.put("/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    category: CategoryUpdate,
    db: Session = Depends(get_db)
):
    db_category = db.query(Category).filter(
        Category.id == category_id
    ).first()

    if not db_category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    if category.name is not None:
        existing_category = db.query(Category).filter(
            Category.name == category.name.strip(),
            Category.id != category_id
        ).first()

        if existing_category:
            raise HTTPException(
                status_code=400,
                detail="Category already exists"
            )

    for field, value in category.model_dump(exclude_unset=True).items():
        setattr(db_category, field, value)

    db.commit()
    db.refresh(db_category)

    return db_category


@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    db_category = db.query(Category).filter(
        Category.id == category_id
    ).first()

    if not db_category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    linked_service = db.query(Service).filter(
        Service.category_id == category_id
    ).first()

    if linked_service:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete category because it is linked to one or more services"
        )

    db.delete(db_category)
    db.commit()

    return {"message": "Category deleted"}