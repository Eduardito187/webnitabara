import React, { useEffect, useState } from 'react';
import './../../css/Validar.css';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Consulta_Cuenta_Roles} from '../../query/consultas';
import {useNavigate} from 'react-router-dom';
import { Menu,Spin } from 'antd';
function RolesMenu() {
    function validarAcciones() {
        getData({ variables: { ID:parseInt(localStorage.ID_USER) } });
    }
    //navegacion
    const navigate = useNavigate();
    const [getData, { loading, error, data }] = useLazyQuery(Consulta_Cuenta_Roles);
    if (loading){
        return(
            <Spin />
        );
      }
      if (error){
        return(
          <div className="cuerpoERROR">
            <div className="vertical-center">
              <div className="cuadro">
                <h1>ERROR</h1>
              </div>
            </div>
          </div>
        );
      }
      if (data!=null) {
        if (data.Usuario!=null) {
            return(
                <Menu theme="light" mode="inline" style={{height:'100vh'}}>
                    {
                        data.Usuario.Roles.map((j) => (
                            <Menu.Item>{j.Rol.Rol}</Menu.Item>
                        ))
                    }
                </Menu>
            );
        }else{
            return (<div><h1>Sin DATA</h1></div>);
        }
      }else{
          validarAcciones();
          return(
                <Spin />
          );
      }
}
export default RolesMenu;