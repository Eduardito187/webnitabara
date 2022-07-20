import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Cargando from './routes/Etiquetas/Cargando';
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = lazy(() => import('./routes/Login'));
const Inicio = lazy(() => import('./routes/Inicio'));
const Validar = lazy(() => import('./routes/Validar'));
const Usuarios = lazy(() => import('./routes/Usuarios'));
const Roles = lazy(() => import('./routes/Roles'));
const Error404 = lazy(() => import('./routes/Error404'));

const Nitabara = (props) => (
  <Router>
    <Suspense fallback={<Cargando />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Validar" element={<Validar />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/Roles" element={<Roles />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Suspense>
  </Router>
);
export default Nitabara;