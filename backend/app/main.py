from fastapi import FastAPI
from sqlalchemy import text

from app.database.database import SessionLocal
from app.api.services import router as services_router
from app.api.category import router as category_router

app = FastAPI(title="20-005 Beep")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-test")
def db_test():
    db = SessionLocal()

    try:
        result = db.execute(text("SELECT 1"))
        return {"database": "ok", "result": result.scalar()}
    finally:
        db.close()

app.include_router(services_router)
app.include_router(category_router)