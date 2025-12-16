# 🏋️‍♂️ NeoRoutines

**NeoRoutines** es una aplicación **full‑stack** para la gestión de rutinas de entrenamiento de gimnasio. Permite crear, editar, buscar y eliminar rutinas con sus ejercicios asociados.

* **Backend**: FastAPI + SQLModel + PostgreSQL
* **Frontend**: React + Tailwind CSS + DaisyUI

El proyecto fue desarrollado con foco en buenas prácticas, validaciones de negocio y una separación clara entre frontend y backend.

---

## 📋 Tabla de Contenidos

* [Requisitos previos](#-requisitos-previos)
* [Estructura del proyecto](#-estructura-del-proyecto)
* [Instalación del backend](#-instalación-del-backend)
* [Instalación del frontend](#-instalación-del-frontend)
* [Ejecución](#-ejecución)
* [Pruebas funcionales](#-pruebas-funcionales)
* [Notas de compatibilidad](#-notas-de-compatibilidad)
* [Checklist de verificación](#-checklist-de-verificación)

---

## 🔧 Requisitos previos

### Backend

* Python **3.10** o superior
* PostgreSQL **12** o superior
* Git (opcional, para clonar el proyecto)

### Frontend

* Node.js **18** o superior
* npm o yarn

---

## 📂 Estructura del proyecto

```
TP-final-rutinas/
├── Backend/               # FastAPI + SQLModel + PostgreSQL
└── Frontend/              # React + Tailwind CSS + DaisyUI
```

---

## 📦 Instalación del backend

### 1️⃣ Crear la base de datos en PostgreSQL

Abrí `psql` y ejecutá:

```sql
CREATE DATABASE gym_routines
  WITH OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'C'
  LC_CTYPE = 'C'
  TEMPLATE = template0;
```

⚠️ **Importante**: si ya existe una base de datos con ese nombre, eliminála primero:

```sql
DROP DATABASE gym_routines;
```

---

### 2️⃣ Configurar variables de entorno

Dentro de la carpeta `Backend/`, creá un archivo `.env`:

```env
DATABASE_URL=postgresql://postgres:123456@localhost:5432/gym_routines
```

> Ajustá la contraseña si tu usuario `postgres` utiliza una diferente.

---

### 3️⃣ Crear entorno virtual e instalar dependencias

Desde una terminal ubicada en `Backend/`:

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

#### 📜 `requirements.txt`

```txt
fastapi==0.115.0
uvicorn[standard]==0.34.0
sqlmodel==0.0.22
pydantic==1.10.17
psycopg2-binary==2.9.10
python-dotenv==1.0.1
```

⚠️ **MUY IMPORTANTE**
Debe usarse **Pydantic v1**. SQLModel **NO es compatible con Pydantic v2**, lo que provoca errores críticos al crear modelos.

---

## 🌐 Instalación del frontend

Desde una terminal ubicada en `Frontend/tpFinalFrontend/`:

```bash
# Instalar dependencias
npm install

# Instalar dependencias específicas
npm install axios
```

### Configurar conexión con el backend

Creá el archivo `.env.local` en `Frontend/tpFinalFrontend/`:

```env
VITE_API_URL=http://localhost:8000
```

---

## 🚀 Ejecución

### Backend

Desde `Backend/` (con el entorno virtual activado):

```bash
python -m uvicorn main:app --reload
```

Verificá el funcionamiento en:

```
http://localhost:8000/docs
```

---

### Frontend

Desde `Frontend/tpFinalFrontend/`:

```bash
npm run dev
```

Verificá el funcionamiento en:

```
http://localhost:5173
```

---

## 🧪 Pruebas funcionales

### ✅ 1. Crear rutina

```json
{
  "nombre": "Día de Pecho",
  "descripcion": "Entrenamiento completo de pecho",
  "dia_semana": "lunes",
  "ejercicios": [
    {
      "nombre": "Press de banca",
      "series": 4,
      "repeticiones": 10,
      "peso": 90,
      "notas": "Bajar hasta tocar la barra",
      "orden": 0
    }
  ]
}
```

### ✅ 2. Ver rutinas

* Lista todas las rutinas creadas
* Muestra el día de la semana y la cantidad de ejercicios

### ✅ 3. Editar rutina

* Permite modificar nombre, día o ejercicios
* No permite nombres de rutina duplicados

### ✅ 4. Eliminar rutina

* Elimina la rutina y todos sus ejercicios asociados
* Solicita confirmación antes de borrar

### ✅ 5. Búsqueda

* Búsqueda por nombre parcial (ejemplo: `"pecho"`)
* Muestra mensaje cuando no hay resultados

---

## ⚠️ Notas de compatibilidad

### 🔴 Problemas conocidos y soluciones

| Problema                                        | Solución                                                      |
| ----------------------------------------------- | ------------------------------------------------------------- |
| `ValueError: 'validated_data' must be provided` | Usar Pydantic v1 (`pip install "pydantic<2.0"`)               |
| Error CORS                                      | Asegurarse de tener `CORSMiddleware` configurado en `main.py` |
| `dia_semana` en ejercicios                      | El día pertenece a la rutina, no a los ejercicios             |
| Peso vacío produce error 422                    | Convertir campos numéricos vacíos a `null`                    |
| Error de collation en PostgreSQL                | Crear la DB usando `TEMPLATE = template0`                     |

---

### 🔵 Dependencias críticas

| Librería | Versión | Motivo                          |
| -------- | ------- | ------------------------------- |
| Pydantic | 1.10.17 | SQLModel no soporta Pydantic v2 |
| FastAPI  | 0.115.0 | Compatibilidad estable          |
| SQLModel | 0.0.22  | Última versión estable          |

---

## 💡 Consejos para evitar errores

* Activar siempre el entorno virtual antes de ejecutar el backend
* No usar Pydantic v2 bajo ningún concepto
* Convertir inputs numéricos vacíos a `null`, no a `""`
* El día de la semana pertenece a la rutina, no a los ejercicios
* Si se modifica el modelo, recrear la base de datos

---

## 🎯 Checklist de verificación

* Backend funcionando en `http://localhost:8000/docs`
* Frontend conectado al backend sin errores CORS
* Se pueden crear rutinas sin peso (campo opcional)
* Los días se muestran correctamente en cada rutina
* La búsqueda filtra correctamente por nombre
* La eliminación borra los ejercicios asociados
* El diseño aplica correctamente el tema naranja/negro de **NeoRoutines**

---

## 👤 Autor

**Theo Lopez Lovatto**
🎓 Trabajo Práctico – Programación

---

## 📄 Licencia

Este proyecto se distribuye bajo licencia MIT. Podés reutilizarlo y adaptarlo libremente.
