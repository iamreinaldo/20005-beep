from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.service import Service
from app.models.category import Category
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from app.services.healthcheck import check_service

router = APIRouter(prefix="/services", tags=["Services"])


@router.post("/", response_model=ServiceResponse)
def create_service(
    service: ServiceCreate,
    db: Session = Depends(get_db)
):
    service_name = service.name.strip()
    service_url = service.url.strip()
    if service.category_id is not None:
        category = db.query(Category).filter(
            Category.id == service.category_id
        ).first()

        if not category:
            raise HTTPException(
                status_code=400,
                detail="Category not found"
            )
    existing_service = db.query(Service).filter(
        Service.url == service_url
    ).first()

    if existing_service:
        raise HTTPException(
            status_code=400,
            detail="Service URL already exists"
        )
    db_service = Service(
        name=service_name,
        description=service.description,
        url=service_url,
        category_id=service.category_id,
        icon=service.icon,
    )

    db.add(db_service)
    db.commit()
    db.refresh(db_service)

    return db_service

@router.get("/")
def list_services(
    db: Session = Depends(get_db)
):
    services = db.query(Service).all()

    return [
        {
            "id": service.id,
            "name": service.name,
            "description": service.description,
            "url": service.url,
            "category_id": service.category_id,
            "icon": service.icon,
            "created_at": service.created_at,
            "updated_at": service.updated_at,
            "status": check_service(service.url),
        }
        for service in services
    ]

@router.get("/{service_id}", response_model=ServiceResponse)
def get_service(
    service_id: int,
    db: Session = Depends(get_db)
):
    db_service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if not db_service:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    return db_service

@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(
    service_id: int,
    service: ServiceUpdate,
    db: Session = Depends(get_db)
):
    db_service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if not db_service:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    if service.category_id is not None:
        category = db.query(Category).filter(
            Category.id == service.category_id
        ).first()

        if not category:
            raise HTTPException(
                status_code=400,
                detail="Category not found"
            )
    if service.url is not None:
        existing_service = db.query(Service).filter(
            Service.url == service.url.strip(),
            Service.id != service_id
        ).first()

        if existing_service:
            raise HTTPException(
                status_code=400,
                detail="Service URL already exists"
            )

    update_data = service.model_dump(exclude_unset=True)

    if "name" in update_data and update_data["name"] is not None:
        update_data["name"] = update_data["name"].strip()

    if "url" in update_data and update_data["url"] is not None:
        update_data["url"] = update_data["url"].strip()

    for field, value in update_data.items():
        setattr(db_service, field, value)

    db.commit()
    db.refresh(db_service)

    return db_service

@router.delete("/{service_id}")
def delete_service(
    service_id: int,
    db: Session = Depends(get_db)
):
    db_service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if not db_service:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    db.delete(db_service)
    db.commit()

    return {"message": "Service deleted"}

@router.get("/{service_id}/status")
def service_status(
    service_id: int,
    db: Session = Depends(get_db)
):
    service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if not service:
        raise HTTPException(
            status_code=404,
            detail="Service not found"
        )

    return {
        "id": service.id,
        "name": service.name,
        "status": check_service(service.url)
    }