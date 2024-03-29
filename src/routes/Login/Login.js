import React, { useEffect, useState } from 'react';
import './../../css/Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Login(props) {
  let navigate = useNavigate();
  const [Consultando, SetConsultando] = useState(false);
  const [Usuario, SetUsuario] = useState("");
  const [Contra, SetContra] = useState("");
  async function consumoAPILogin() {
    if (Usuario.length>0) {
      if (Contra.length>0) {
        SetConsultando(true);
        localStorage.Tipo = "Login";
        localStorage.Usuario = Usuario;
        localStorage.Contra = Contra;
        window.location.href = "/Validar";
      }else{
        alert("Digite su Password");
      }
    }else{
      alert("Digite el Usuario");
    }
  }
  function updateUSER(event) {
    SetUsuario(event.target.value);
  }
  function updatePASSWORD(event) {
    SetContra(event.target.value);
  }
  if (localStorage.ID_USER!=null) {
    window.location.href = "/Inicio";
  }else{
    return (
      <div className="cuerpo-nita">
        <div className="centrado-centro">
          <div className="contenedor-login">
            <div className="contenedorIMG">
              <img src="files/user.png" className="imgLogin" alt="" />
              <p className="textSING">Iniciar Sesion</p>
            </div>
            <div className="contenedorLogin">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label><strong>Usuario:</strong></Form.Label>
                  <Form.Control type="text" placeholder="Usuario" disabled={Consultando} value={Usuario} onChange={updateUSER} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label><strong>Password:</strong></Form.Label>
                  <Form.Control type="password" placeholder="Password" disabled={Consultando} value={Contra} onChange={updatePASSWORD}  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="success" size="lg" type="submit" disabled={Consultando} onClick={()=>consumoAPILogin()}>
                    Iniciar Sesion
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;