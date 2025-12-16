from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from database import get_session
from crud import *
from schemas import RutinaCreate, Rutina  # ← RutinaCreate y RutinaResponse del schema
from models import Rutina as RutinaModel  # ← ¡El modelo de la base de datos!
from typing import List

router = APIRouter(prefix="/api/rutinas", tags=["rutinas"])

@router.post("/", response_model=Rutina)
def crear_rutina(rutina: RutinaCreate, session: Session = Depends(get_session)):
    # Verificar nombre único
    existing = session.exec(select(RutinaModel).where(RutinaModel.nombre == rutina.nombre)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Nombre de rutina ya existe")
    
    # Crear rutina
    rutina_db = create_rutina(session, rutina.dict(exclude={"ejercicios"}))
    
    # Crear ejercicios
    for ej in rutina.ejercicios:
        ej_dict = ej.dict()
        ej_dict["rutina_id"] = rutina_db.id
        create_ejercicio(session, ej_dict)
    
    # Cargar la rutina completa con ejercicios
    rutina_completa = get_rutina_by_id(session, rutina_db.id)
    return rutina_completa

@router.get("/", response_model=List[Rutina])
def listar_rutinas(session: Session = Depends(get_session)):
    return get_all_rutinas(session)

@router.get("/buscar")
def buscar_rutinas(nombre: str = Query(..., min_length=1), session: Session = Depends(get_session)):
    return get_rutinas_by_nombre(session, nombre)

@router.get("/{rutina_id}", response_model=Rutina)
def obtener_rutina(rutina_id: int, session: Session = Depends(get_session)):
    rutina = get_rutina_by_id(session, rutina_id)  # ← Debe usar RutinaModel
    if not rutina:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    return rutina

@router.put("/{rutina_id}", response_model=Rutina)
def actualizar_rutina(rutina_id: int, rutina: RutinaCreate, session: Session = Depends(get_session)):
    rutina_actual = get_rutina_by_id(session, rutina_id)
    if not rutina_actual:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    
    if rutina.nombre != rutina_actual.nombre:
        existing = session.exec(select(Rutina).where(Rutina.nombre == rutina.nombre)).first()
        if existing:
            raise HTTPException(status_code=400, detail="Nombre de rutina ya existe")
    
    rutina_actualizado = update_rutina(session, rutina_id, rutina.dict(exclude={"ejercicios"}))
    
    # Eliminar ejercicios actuales y crear nuevos
    ejercicios_actuales = session.exec(select(Ejercicio).where(Ejercicio.rutina_id == rutina_id)).all()
    for ej in ejercicios_actuales:
        session.delete(ej)
    session.commit()
    
    for ej in rutina.ejercicios:
        ej_dict = ej.dict()
        ej_dict["rutina_id"] = rutina_id
        create_ejercicio(session, ej_dict)
    
    return get_rutina_by_id(session, rutina_id)

@router.delete("/{rutina_id}")
def eliminar_rutina(rutina_id: int, session: Session = Depends(get_session)):
    success = delete_rutina(session, rutina_id)
    if not success:
        raise HTTPException(status_code=404, detail="Rutina no encontrada")
    return {"message": "Rutina eliminada"}