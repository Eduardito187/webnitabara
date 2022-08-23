import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Cargando from './routes/Etiquetas/Cargando';
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = lazy(() => import('./routes/Login/Login'));
const Inicio = lazy(() => import('./routes/Inicio/Inicio'));
const Validar = lazy(() => import('./routes/Etiquetas/Validar'));
const Usuarios = lazy(() => import('./routes/Usuarios/Usuarios'));
const Usuario = lazy(() => import('./routes/Usuarios/Usuario'));
const RegistrarUsuario = lazy(() => import('./routes/Usuarios/RegistrarUsuario'));
const Roles = lazy(() => import('./routes/Roles/Roles'));
const RegistrarRol = lazy(() => import('./routes/Roles/RegistrarRol'));
const EditarRol = lazy(() => import('./routes/Roles/EditarRol'));
const Error404 = lazy(() => import('./routes/404/Error404'));
const MiPerfil = lazy(() => import('./routes/Usuarios/MiPerfil'));

const Laboratorios = lazy(() => import('./routes/Laboratorios/Laboratorios.tsx'));
const Consultas = lazy(() => import('./routes/Consultas/Consultas.tsx'));
const Cirugias = lazy(() => import('./routes/Cirugias/Cirugias.tsx'));

const Nitabara = (props) => (
  <Router>
    <Suspense fallback={<Cargando />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Validar" element={<Validar />} />
        <Route path="/Usuarios" element={<Usuarios />} />
        <Route path="/RegistrarUsuario" element={<RegistrarUsuario />} />
        <Route path="/Usuario/:ID" element={<Usuario />} />
        <Route path="/Roles" element={<Roles />} />
        <Route path="/RegistrarRol" element={<RegistrarRol />} />
        <Route path="/EditarRol/:ID" element={<EditarRol />} />
        <Route path="/MiPerfil" element={<MiPerfil />} />
        <Route path="/Laboratorios" element={<Laboratorios />} />
        <Route path="/Consultas" element={<Consultas />} />
        <Route path="/Cirugias" element={<Cirugias />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Suspense>
  </Router>
);
export default Nitabara;