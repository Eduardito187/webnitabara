import { Button, Card, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import * as React from 'react';
import { useMutation } from '@apollo/client';
import {UpdateContraUser} from "../../query/consultas";
import Cargando from './Cargando';
import {NotificacionNitabara} from "./Notificar";
const UpdatePWD = (props) => {
    const [Load,SetLoad] = React.useState(false);
    const [Password,SetPassword] = React.useState("");
    const [SetEditPWD, { loading:Cargando_SetUser, error:Error_SetUser, data:Data_SetUser }] = useMutation(UpdateContraUser);

    React.useEffect(() => {
        SetLoad(true);
    },[]);
    function cambioTexto(a){
        SetPassword(a.target.value);
    }
    function CambioContraAPI() {
        SetEditPWD({ variables: {ID:parseInt(props.ID),Contra:Password}}).then(({ data }) => {
            if (data.UpdateContra!=null) {
                if (data.UpdateContra.response) {
                    NotificacionNitabara('success','NITABARA','Actualizacion Exitosa.');
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
    if (Load) {
        return (
            <Card title="Cambiar Password" bordered={true} style={{width:'100%'}}>
                <Input.Password placeholder="Espacio password" onChange={(a)=>cambioTexto(a)} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                {
                    Password.length>3
                    ? <Button onClick={()=>CambioContraAPI()}>Actualizar Password</Button>
                    : null
                }
            </Card>
        );
    }else{
        return <Cargando />;
    }
};

export default UpdatePWD;