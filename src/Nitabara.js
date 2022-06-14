import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = lazy(() => import('./routes/Login'));
const Inicio = lazy(() => import('./routes/Inicio'));
const Validar = lazy(() => import('./routes/Validar'));

const Nitabara = (props) => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Validar" element={<Validar />} />
      </Routes>
    </Suspense>
  </Router>
);
export default Nitabara;