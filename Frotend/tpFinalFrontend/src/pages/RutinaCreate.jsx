import { useNavigate, Link } from 'react-router-dom';
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

export default function RutinaCreate() {
  const navigate = useNavigate();

  const handleGuardar = async (rutinaData) => {
    try {
      const cleanedData = cleanRutinaData(rutinaData);
      await api.post('/rutinas', cleanedData);
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
    <>
      <Link 
        to="/" 
        className="inline-block mb-4 text-orange-400 hover:text-orange-300 font-medium"
      >
        ← Volver al inicio
      </Link>
      <div>
        <RutinaForm 
          onSubmit={handleGuardar} 
          onCancel={handleCancelar} 
        />
      </div>
    </>
  );
}