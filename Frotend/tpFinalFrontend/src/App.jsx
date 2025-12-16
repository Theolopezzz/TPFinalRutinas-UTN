import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RutinasList from './pages/RutinasList';
import RutinaDetail from './pages/RutinaDetail';
import RutinaCreate from './pages/RutinaCreate';
import RutinaEdit from './pages/RutinaEdit';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 py-5">
        <div className="container mx-auto pt-6">
          <Routes>
            <Route path="/" element={<RutinasList />} />
            <Route path="/rutinas/:id" element={<RutinaDetail />} />
            <Route path="/crear" element={<RutinaCreate />} />
            <Route path="/editar/:id" element={<RutinaEdit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;