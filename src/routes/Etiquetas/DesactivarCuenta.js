import { Button, Card, Input, Switch } from 'antd';
import * as React from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {BloquearUserAPI,GetStateUser} from "../../query/consultas";
import Cargando from './Cargando';
import ErrorNULL from './ErrorNULL';
import {NotificacionNitabara} from "./Notificar";
const DesactivarCuenta = (props) => {
    const [Cuenta,SetCuenta] = React.useState(null);
    const [load,Setload] = React.useState(true);
    const [estado,Setestado] = React.useState(false);
    const [SetEditUser, { loading:Cargando_SetUser, error:Error_SetUser, data:Data_SetUser }] = useMutation(BloquearUserAPI);
    const [GetUserAPI, { loading:Cargando_User, error:Error_User, data:Data_User }] = useLazyQuery(GetStateUser);

    React.useEffect(() => {
        GetUserAPI({ variables: {ID:parseInt(props.ID)}}).then(({ data }) => {
            if (data.Usuario!=null) {
                SetCuenta(data.Usuario);
                Setload(false);
                Setestado(data.Usuario.State);
            }else{
                SetCuenta("No Data");
            }
          }).catch(e => {
            NotificacionNitabara('error','NITABARA','Error en API.');
          });
    },[]);

    function checkUpdate(state) {
        Setestado(state);
        Setload(true);
        SetEditUser({ variables: {ID:parseInt(props.ID),Estado:state}}).then(({ data }) => {
            if (data.Bloquear_Usuario!=null) {
                if (data.Bloquear_Usuario.response) {
                    Setload(false);
                    NotificacionNitabara('success','NITABARA',state?'Usuario Activo.':'Usuario Bloqueado.');
                }else{
                    NotificacionNitabara('error','NITABARA','Error en API.');
                }
            }else{
                NotificacionNitabara('error','NITABARA','Error en API.');
            }
          }).catch(e => {
            NotificacionNitabara('error','NITABARA','Error en API.');
          });
    }

    if (Cuenta=="No Data") {
        return <ErrorNULL />;
    }else if (Cuenta!=null) {
        return (
            <Card title="Bloquear Cuenta" bordered={true} style={{width:'100%'}}>
                <Switch loading={load} checked={estado} onChange={(a)=>checkUpdate(a)} />
            </Card>
        );
    }else{
        return <Cargando />;
    }
};

export default DesactivarCuenta;