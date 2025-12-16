from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from datetime import datetime

class Rutina(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, unique=True)
    descripcion: Optional[str] = None
    dia_semana: str = Field(min_length=4, max_length=10)
    fecha_creacion: str = Field(default_factory=lambda: datetime.now().isoformat())
    
    ejercicios: List["Ejercicio"] = Relationship(back_populates="rutina")

class Ejercicio(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str
    series: int
    repeticiones: int
    peso: Optional[float] = None
    notas: Optional[str] = None
    orden: int = 0
    rutina_id: int = Field(foreign_key="rutina.id")
    rutina: Rutina = Relationship(back_populates="ejercicios")