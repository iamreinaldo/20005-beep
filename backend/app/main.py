from fastapi import FastAPI
from sqlalchemy import text

from app.database.database import SessionLocal
from app.api.services import router as services_router
from app.api.category import router as category_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="20-005 Beep")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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