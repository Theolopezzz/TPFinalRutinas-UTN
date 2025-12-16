// src/pages/RutinaCreate.jsx
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import RutinaForm from '../components/RutinaForm';

export default function RutinaCreate() {
  const navigate = useNavigate();

  const handleGuardar = async (rutinaData) => {
    try {
      await api.post('/rutinas', rutinaData);
      navigate('/');
    } catch (error) {
      console.error('Error al crear rutina:', error);
      alert('Error al crear la rutina. Verifica que el nombre no esté duplicado.');
    }
  };

  const handleCancelar = () => {
    navigate('/');
  };

  return (
    <div>
      <RutinaForm 
        onSubmit={handleGuardar} 
        onCancel={handleCancelar} 
      />
    </div>
  );
}
