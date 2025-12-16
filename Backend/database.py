from sqlmodel import create_engine, Session, SQLModel 
from fastapi import Depends
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:123456@localhost:5432/gym_routines")

engine = create_engine(DATABASE_URL, echo=True)

def get_session():
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    from models import Rutina, Ejercicio
    SQLModel.metadata.create_all(engine)