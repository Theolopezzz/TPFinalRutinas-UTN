import { useState } from 'react';
import EjercicioForm from './EjercicioForm';

const DIAS_SEMANA = [
  { value: 'lunes', label: 'Lunes' },
  { value: 'martes', label: 'Martes' },
  { value: 'miercoles', label: 'Miércoles' },
  { value: 'jueves', label: 'Jueves' },
  { value: 'viernes', label: 'Viernes' },
  { value: 'sabado', label: 'Sábado' },
  { value: 'domingo', label: 'Domingo' }
];

export default function RutinaForm({ rutinaInicial = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: rutinaInicial.nombre || '',
    descripcion: rutinaInicial.descripcion || '',
    ejercicios: rutinaInicial.ejercicios || []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEjercicio = () => {
    setFormData(prev => ({
      ...prev,
      ejercicios: [...prev.ejercicios, { dia_semana: 'lunes', series: 3, repeticiones: 10, orden: prev.ejercicios.length }]
    }));
  };

  const handleEjercicioChange = (index, updatedEjercicio) => {
    setFormData(prev => {
      const nuevosEjercicios = [...prev.ejercicios];
      nuevosEjercicios[index] = updatedEjercicio;
      return { ...prev, ejercicios: nuevosEjercicios };
    });
  };

  const handleRemoveEjercicio = (index) => {
    setFormData(prev => ({
      ...prev,
      ejercicios: prev.ejercicios.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">
          {rutinaInicial.id ? 'Editar Rutina' : 'Crear Nueva Rutina'}
        </h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Nombre de la rutina *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Descripción (opcional)</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Ejercicios</h3>
            <button
              type="button"
              onClick={handleAddEjercicio}
              className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Agregar Ejercicio</span>
            </button>
          </div>
          
          {formData.ejercicios.length === 0 ? (
            <p className="text-gray-400 italic">No hay ejercicios agregados. Haz clic en "Agregar Ejercicio" para comenzar.</p>
          ) : (
            <div className="space-y-4">
              {formData.ejercicios.map((ejercicio, index) => (
                <EjercicioForm
                  key={index}
                  ejercicio={ejercicio}
                  onChange={(updatedEj) => handleEjercicioChange(index, updatedEj)}
                  onRemove={() => handleRemoveEjercicio(index)}
                  diasSemana={DIAS_SEMANA}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-bold transition-colors duration-200"
          >
            {rutinaInicial.id ? 'Actualizar Rutina' : 'Crear Rutina'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
}