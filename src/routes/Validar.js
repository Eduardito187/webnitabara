import React, { useEffect, useState } from 'react';
import './../css/Validar.css';
import { useMutation } from '@apollo/client';
import {Validar_LOG} from '../query/consultas';
import {useNavigate} from 'react-router-dom';
import { clave } from '../Crypt';
var CryptoJS = require("crypto-js");
//uso de la libreria Crypto-js

function Validar() {
    function validarAcciones() {
      if (localStorage.Tipo=="Login") {
        //valida el login
        getData({ variables: { Usuario:localStorage.Usuario,Contra:localStorage.Contra } })
        localStorage.removeItem('Tipo');
        localStorage.removeItem('Usuario');
        localStorage.removeItem('Contra');
      }
    }
    //navegacion
    const navigate = useNavigate();
    const [getData, { loading, error, data }] = useMutation(Validar_LOG);
    if (loading){
      return(
        <div className="cuerpoSUCCESS">
          <div className="vertical-center">
            <div className="cuadro">
              <h1>Cargando...</h1>
            </div>
          </div>
        </div>
      );
    }
    if (error){
      return(
        <div className="cuerpoERROR">
          <div className="vertical-center">
            <div className="cuadro">
              <h1>ERROR DB</h1>
            </div>
          </div>
        </div>
      );
    }
    if (data!=null) {
      if (data.validacion_login!=null) {
        if (data.validacion_login.estado) {
          localStorage.ID_USER = parseInt(data.validacion_login.id_cuenta);
          navigate(-1);
          return(
            <div className="cuerpoSUCCESS">
              <div className="vertical-center">
                <div className="cuadro">
                  <h1>Bienvenido!!</h1>
                </div>
              </div>
            </div>
          );
        }else{
          navigate(-1);
        }
      }
    }else if(localStorage.Tipo!=null && data==null) {
      validarAcciones();
      return(
        <div className="cuerpoSUCCESS">
          <div className="vertical-center">
            <div className="cuadro">
              <h1>{localStorage.Tipo}</h1>
            </div>
          </div>
        </div>
      );
    }else{
      return(
        <div className="cuerpoERROR">
          <div className="vertical-center">
            <div className="cuadro">
              <h1>Validando...</h1>
            </div>
          </div>
        </div>
      );
    }
}
export default Validar;