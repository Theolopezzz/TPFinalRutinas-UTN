import { Link } from 'react-router-dom';

export default function RutinaCard({ rutina }) {
  const cantidadEjercicios = rutina.ejercicios?.length || 0;
  
  return (
    <div className="mt-2 bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{rutina.nombre}</h3>
          <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full text-sm font-medium">
            {cantidadEjercicios} Ejercicio{cantidadEjercicios === 1 ? '' : 's'}
          </span>
        </div>
        
        {rutina.descripcion && (
          <p className="text-gray-300 mb-4 line-clamp-2">{rutina.descripcion}</p>
        )}
        
        <div className="flex space-x-2">
          <Link 
            to={`/rutinas/${rutina.id}`}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Ver Rutina
          </Link>
          <Link 
            to={`/editar/${rutina.id}`}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}