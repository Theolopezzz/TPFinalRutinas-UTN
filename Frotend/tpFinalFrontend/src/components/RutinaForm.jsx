import React, { useState } from 'react';
import EjercicioForm from './EjercicioForm';

export default function RutinaForm({ rutinaInicial = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: rutinaInicial.nombre || '',
    descripcion: rutinaInicial.descripcion || '',
    dia_semana: rutinaInicial.dia_semana || 'lunes',
    ejercicios: rutinaInicial.ejercicios || []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAddEjercicio = () => {
    setFormData(prev => ({
      ...prev,
      ejercicios: [...prev.ejercicios, { 
        nombre: '', 
        series: 4, 
        repeticiones: 10, 
        peso: 0, 
        notas: '', 
        orden: prev.ejercicios.length 
      }]
    }));
  };

  const handleEjercicioChange = (index, updatedEj) => {
    setFormData(prev => {
      const newEjercicios = [...prev.ejercicios];
      newEjercicios[index] = updatedEj;
      return { ...prev, ejercicios: newEjercicios };
    });
  };

  const handleRemoveEjercicio = (index) => {
    setFormData(prev => {
      const newEjercicios = prev.ejercicios.filter((_, i) => i !== index);
      return { ...prev, ejercicios: newEjercicios };
    });
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
              onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Día de la semana *</label>
            <select
              name="dia_semana"
              value={formData.dia_semana}
              onChange={(e) => setFormData(prev => ({ ...prev, dia_semana: e.target.value }))}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="lunes">Lunes</option>
              <option value="martes">Martes</option>
              <option value="miercoles">Miércoles</option>
              <option value="jueves">Jueves</option>
              <option value="viernes">Viernes</option>
              <option value="sabado">Sábado</option>
              <option value="domingo">Domingo</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Descripción (opcional)</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
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
            <p className="text-gray-400 italic">No hay ejercicios agregados.</p>
          ) : (
            <div className="space-y-4">
              {formData.ejercicios.map((ejercicio, index) => (
                <EjercicioForm
                  key={index}
                  ejercicio={ejercicio}
                  onChange={(updatedEj) => handleEjercicioChange(index, updatedEj)}
                  onRemove={() => handleRemoveEjercicio(index)}
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