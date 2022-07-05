import React, { useEffect, useState } from 'react';
import './../../css/Validar.css';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Consulta_Cuenta} from '../../query/consultas';
import {useNavigate} from 'react-router-dom';
import { clave } from '../../Crypt';
var CryptoJS = require("crypto-js");
function Roles() {
    function validarAcciones() {
        getData({ variables: { ID:parseInt(localStorage.ID_USER) } });
    }
    //navegacion
    const navigate = useNavigate();
    const [getData, { loading, error, data }] = useLazyQuery(Consulta_Cuenta);
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
        if (data.Usuario!=null) {
            return(
                <div className="cuerpoSUCCESS">
                    <div className="vertical-center">
                        <div className="cuadro">
                            <h1>Bienvenido <strong>{data.Usuario.Persona.Nombre + ' '+data.Usuario.Persona.Paterno+' '+data.Usuario.Persona.Materno}</strong></h1>
                            {
                                data.Usuario.Roles.map((j) => (
                                    <h5>{j.Rol.Rol}</h5>
                                ))
                            }
                            <h5></h5>
                        </div>

                    </div>
                </div>
            );
        }else{
            return (<div><h1>Sin DATA</h1></div>);
        }
      }else{
          validarAcciones();
          return(
              <div className="cuerpoERROR">
                  <div className="vertical-center">
                      <div className="cuadro">
                      <h1>obteniento...</h1>
                      </div>
                  </div>
              </div>
          );
      }
}
export default Roles;