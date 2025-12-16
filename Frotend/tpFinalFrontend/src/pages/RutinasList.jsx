import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import SearchBar from '../components/SearchBar';
import RutinaCard from '../components/RutinaCard';

export default function RutinasList() {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const cargarRutinas = async (query = '') => {
    try {
      setLoading(true);
      const response = query 
        ? await api.get(`/rutinas/buscar?nombre=${query}`)
        : await api.get('/rutinas');
      setRutinas(response.data);
    } catch (error) {
      console.error('Error al cargar rutinas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    cargarRutinas(query);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">NeoRoutines</h1>
        <Link 
          to="/crear"
          className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-lg font-bold transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Nueva Rutina</span>
        </Link>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-300 mt-4">Cargando rutinas...</p>
        </div>
      ) : rutinas.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchQuery ? 'No se encontraron rutinas' : 'No hay rutinas creadas'}
            </h3>
            <p className="text-gray-400 mb-4">
              {searchQuery 
                ? `No hay rutinas que coincidan con "${searchQuery}"`
                : 'Comienza creando tu primera rutina de entrenamiento'}
            </p>
            {!searchQuery && (
              <Link 
                to="/crear"
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Crear Primera Rutina
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rutinas.map(rutina => (
            <RutinaCard key={rutina.id} rutina={rutina} />
          ))}
        </div>
      )}
    </div>
  );
}