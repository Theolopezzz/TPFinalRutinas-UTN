from sqlmodel import Session, select
from models import Rutina, Ejercicio
from typing import List, Optional

# === RUTINAS ===
def create_rutina(session: Session, rutina_data: dict) -> Rutina:
    rutina = Rutina(**rutina_data)
    session.add(rutina)
    session.commit()
    # Recargar el objeto completo por ID
    return session.get(Rutina, rutina.id)

def get_rutina_by_id(session: Session, rutina_id: int) -> Optional[Rutina]:
    rutina = session.get(Rutina, rutina_id)
    if rutina:
        session.refresh(rutina, ["ejercicios"])
    return rutina

def get_all_rutinas(session: Session) -> List[Rutina]:
    rutinas = session.exec(select(Rutina)).all()
    # Cargar ejercicios para cada rutina
    for r in rutinas:
        session.refresh(r, ["ejercicios"])
    return rutinas

def get_rutinas_by_nombre(session: Session, nombre: str) -> List[Rutina]:
    statement = select(Rutina).where(Rutina.nombre.icontains(nombre))
    rutinas = session.exec(statement).all()
    for r in rutinas:
        session.refresh(r, ["ejercicios"])
    return rutinas

def update_rutina(session: Session, rutina_id: int, rutina_data: dict) -> Optional[Rutina]:
    rutina = session.get(Rutina, rutina_id)
    if rutina:
        for key, value in rutina_data.items():
            setattr(rutina, key, value)
        session.add(rutina)
        session.commit()
        session.refresh(rutina)
    return rutina

def delete_rutina(session: Session, rutina_id: int) -> bool:
    rutina = session.get(Rutina, rutina_id)
    if rutina:
        session.delete(rutina)
        session.commit()
        return True
    return False

# === EJERCICIOS ===
def create_ejercicio(session: Session, ejercicio_data: dict) -> Ejercicio:
    ejercicio = Ejercicio(**ejercicio_data)
    session.add(ejercicio)
    session.commit()
    session.refresh(ejercicio)
    return ejercicio

def update_ejercicio(session: Session, ejercicio_id: int, ejercicio_data: dict) -> Optional[Ejercicio]:
    ejercicio = session.get(Ejercicio, ejercicio_id)
    if ejercicio:
        for key, value in ejercicio_data.items():
            setattr(ejercicio, key, value)
        session.add(ejercicio)
        session.commit()
        session.refresh(ejercicio)
    return ejercicio

def delete_ejercicio(session: Session, ejercicio_id: int) -> bool:
    ejercicio = session.get(Ejercicio, ejercicio_id)
    if ejercicio:
        session.delete(ejercicio)
        session.commit()
        return True
    return False