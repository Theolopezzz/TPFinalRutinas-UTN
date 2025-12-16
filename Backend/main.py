from fastapi import FastAPI
from database import create_db_and_tables
from api import rutinas

app = FastAPI(title="API de Rutinas de Gimnasio")

app.include_router(rutinas.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def root():
    return {"message": "API de Rutinas de Gimnasio"}