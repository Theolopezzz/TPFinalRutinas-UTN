import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function RutinaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rutina, setRutina] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarRutina = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/rutinas/${id}`);
        setRutina(response.data);
      } catch (error) {
        console.error('Error al cargar rutina:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    cargarRutina();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta rutina? Se eliminarán todos los ejercicios asociados.')) {
      try {
        await api.delete(`/rutinas/${id}`);
        navigate('/');
      } catch (error) {
        console.error('Error al eliminar rutina:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="text-gray-300 mt-4">Cargando rutina...</p>
      </div>
    );
  }

  if (!rutina) return null;

  const nombreDia = {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes',
    sabado: 'Sábado',
    domingo: 'Domingo'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">{rutina.nombre}</h1>
          <p className="text-orange-400 font-medium mt-1">
            {nombreDia[rutina.dia_semana]}
          </p>
          {rutina.descripcion && <p className="text-gray-300 mt-2">{rutina.descripcion}</p>}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/editar/${id}`)}
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>

      {rutina.ejercicios?.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
          <p className="text-gray-300">Esta rutina no tiene ejercicios asignados.</p>
          <button
            onClick={() => navigate(`/editar/${id}`)}
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Agregar Ejercicios
          </button>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-orange-400 mb-4">Ejercicios</h2>
          <div className="space-y-3">
            {rutina.ejercicios
              .sort((a, b) => a.orden - b.orden)
              .map((ej, index) => (
                <div key={index} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white">{ej.nombre}</h3>
                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-sm">
                      {ej.series} × {ej.repeticiones}
                      {ej.peso && ` · ${ej.peso}kg`}
                    </span>
                  </div>
                  {ej.notas && <p className="text-gray-300 mt-2 text-sm">{ej.notas}</p>}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}