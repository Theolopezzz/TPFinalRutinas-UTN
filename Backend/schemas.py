from pydantic import BaseModel, Field, validator
from typing import List, Optional

DIAS_VALIDOS = {"lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"}

class EjercicioBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    series: int = Field(..., ge=1)
    repeticiones: int = Field(..., ge=1)
    peso: Optional[float] = Field(None, ge=0)
    notas: Optional[str] = Field(None, max_length=500)
    orden: int = Field(0, ge=0)

class EjercicioCreate(EjercicioBase):
    pass

class Ejercicio(EjercicioBase):
    id: int
    rutina_id: int

    class Config:
        from_attributes = True

class RutinaBase(BaseModel):
    nombre: str = Field(..., min_length=1, max_length=100)
    descripcion: Optional[str] = Field(None, max_length=500)
    dia_semana: str = Field(..., min_length=4, max_length=10)
    
    @validator('dia_semana')
    def validate_dia_semana(cls, v):
        if v.lower() not in DIAS_VALIDOS:
            raise ValueError(f"Día inválido. Debe ser uno de: {', '.join(DIAS_VALIDOS)}")
        return v.lower()

class RutinaCreate(RutinaBase):
    ejercicios: List[EjercicioCreate] = []

class Rutina(RutinaBase):
    id: int
    ejercicios: List[Ejercicio] = []
    fecha_creacion: str

    class Config:
        from_attributes = True

class RutinaUpdate(BaseModel):
    nombre: Optional[str] = Field(None, min_length=1, max_length=100)
    descripcion: Optional[str] = Field(None, max_length=500)
    dia_semana: Optional[str] = Field(None, min_length=4, max_length=10)
    ejercicios: Optional[List[EjercicioCreate]] = None
    
    @validator('dia_semana')
    def validate_dia_semana(cls, v):
        if v is not None and v.lower() not in DIAS_VALIDOS:
            raise ValueError(f"Día inválido. Debe ser uno de: {', '.join(DIAS_VALIDOS)}")
        return v.lower() if v else v