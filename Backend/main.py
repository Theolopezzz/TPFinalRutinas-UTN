from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from database import create_db_and_tables
from api import rutinas_router

app = FastAPI(title="API de Rutinas de Gimnasio")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

app.include_router(rutinas_router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/")
def root():
    return {"message": "API de Rutinas de Gimnasio"}