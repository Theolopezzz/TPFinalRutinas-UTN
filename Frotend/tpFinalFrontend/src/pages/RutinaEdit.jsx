import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import RutinaForm from '../components/RutinaForm';

const cleanRutinaData = (data) => {
  return {
    ...data,
    ejercicios: data.ejercicios.map(ej => {
      const { peso, ...rest } = ej;
      if (peso === null || peso === undefined || peso === '' || isNaN(peso)) {
        return rest;
      }
      return { ...rest, peso: parseFloat(peso) };
    })
  };
};

export default function RutinaEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rutina, setRutina] = useState(null);

  useEffect(() => {
    const cargarRutina = async () => {
      try {
        const response = await api.get(`/rutinas/${id}`);
        setRutina(response.data);
      } catch (error) {
        console.error('Error al cargar rutina:', error);
        navigate('/');
      }
    };
    cargarRutina();
  }, [id, navigate]);

  const handleGuardar = async (rutinaData) => {
    try {
      const cleanedData = cleanRutinaData(rutinaData);
      await api.put(`/rutinas/${id}`, cleanedData);
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar rutina:', error);
      alert('Error al actualizar la rutina. Verifica que el nombre no esté duplicado.');
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

  if (!rutina) return null;

  return (
    <div>
      <RutinaForm 
        rutinaInicial={rutina} 
        onSubmit={handleGuardar} 
        onCancel={handleCancelar} 
      />
    </div>
  );
}