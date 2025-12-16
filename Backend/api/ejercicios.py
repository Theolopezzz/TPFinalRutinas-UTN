from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from database import get_session
from crud import update_ejercicio, delete_ejercicio
from schemas import Ejercicio, EjercicioBase

router = APIRouter(prefix="/api/ejercicios", tags=["ejercicios"])

@router.put("/{ejercicio_id}", response_model=Ejercicio)
def actualizar_ejercicio(ejercicio_id: int, ejercicio: EjercicioBase, session: Session = Depends(get_session)):
    ejercicio_actualizado = update_ejercicio(session, ejercicio_id, ejercicio.dict())
    if not ejercicio_actualizado:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return ejercicio_actualizado

@router.delete("/{ejercicio_id}")
def eliminar_ejercicio(ejercicio_id: int, session: Session = Depends(get_session)):
    success = delete_ejercicio(session, ejercicio_id)
    if not success:
        raise HTTPException(status_code=404, detail="Ejercicio no encontrado")
    return {"message": "Ejercicio eliminado"}