import { useState } from 'react';

export default function EjercicioForm({ ejercicio, onChange, onRemove }) {
  const [formData, setFormData] = useState({
    nombre: ejercicio.nombre || '',
    series: ejercicio.series || 3,
    repeticiones: ejercicio.repeticiones || 10,
    peso: ejercicio.peso || '',
    notas: ejercicio.notas || '',
    orden: ejercicio.orden || 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let newValue = value;
    if (['series', 'repeticiones', 'peso'].includes(name)) {
      if (value === '') {
        newValue = null; 
      } else {
        newValue = parseFloat(value);
        if (name === 'peso' && isNaN(newValue)) {
          newValue = null;
        }
      }
    }
    
    setFormData(prev => {
      const updated = { ...prev, [name]: newValue };
      onChange(updated); 
      return updated;
    });
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nombre del ejercicio</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Series</label>
          <input
            type="number"
            name="series"
            min="1"
            value={formData.series || ''}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Repeticiones</label>
          <input
            type="number"
            name="repeticiones"
            min="1"
            value={formData.repeticiones || ''}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Peso (kg) - opcional</label>
          <input
            type="number"
            name="peso"
            min="0"
            step="0.1"
            value={formData.peso ?? ''}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Notas adicionales</label>
        <textarea
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          rows="2"
          className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded font-medium transition-colors duration-200"
      >
        Eliminar Ejercicio
      </button>
    </div>
  );
}