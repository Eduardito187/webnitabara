import { Button, Select, Form, Input, DatePicker } from 'antd';
import * as React from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Ciudades,Zonas,Barrios,TiposDocumentos,EditarUsuarioAPI,UpdateUsuario,DeleteUsuario} from "../../query/consultas";
import Cargando from './Cargando';
import ErrorDB from './ErrorDB';
import ErrorNULL from './ErrorNULL';
import moment from 'moment';
import {NotificacionNitabara} from "./Notificar";
import { GetDateToMomment } from '../../helpers/GetDate';
const dateFormat = 'YYYY-MM-DD';
const EditarUsuario = (props) => {
    const [Cuenta,SetCuenta] = React.useState(null);
    const [SetEditUser, { loading:Cargando_SetUser, error:Error_SetUser, data:Data_SetUser }] = useMutation(UpdateUsuario);
    const [DelEditUser, { loading:Cargando_DelUser, error:Error_DelUser, data:Data_DelUser }] = useMutation(DeleteUsuario);
    const [GetCiudad, { loading:Cargando_Ciudad, error:Error_Ciudad, data:Data_Ciudades }] = useLazyQuery(Ciudades);
    const [GetBarrios, { loading:Cargando_Barrio, error:Error_Barrio, data:Data_Barrios }] = useLazyQuery(Barrios);
    const [GetTipoDoc, { loading:Cargando_TipoDoc, error:Error__TipoDoc, data:Data_TipoDoc }] = useLazyQuery(TiposDocumentos);
    const [GetZonas, { loading:Cargando_Zona, error:Error_Zona, data:Data_Zonas }] = useLazyQuery(Zonas);
    const [GetUserAPI, { loading:Cargando_User, error:Error_User, data:Data_User }] = useLazyQuery(EditarUsuarioAPI);

    React.useEffect(() => {
        GetCiudad();
        GetBarrios();
        GetTipoDoc();
        GetZonas();
        GetUserAPI({ variables: {ID:parseInt(props.ID)}}).then(({ data }) => {
            if (data.Usuario!=null) {
                SetCuenta(data.Usuario);
            }else{
                SetCuenta("No Data");
            }
          })
          .catch(e => {
            NotificacionNitabara('error','NITABARA','Error en API.');
          });
    },[]);

    function EliminarUser() {
        DelEditUser({ variables: {ID:parseInt(props.ID)} }).then(({ data }) => {
            let x = false;
            if (data.Eliminar_Usuario!=null) {
                if (data.Eliminar_Usuario.response) {
                    x = true;
                    NotificacionNitabara('info','NITABARA','Usuario eliminado.');
                }
            }
            if (x == false) {
                NotificacionNitabara('error','NITABARA','Error en API.');
            }
          })
          .catch(e => {
            NotificacionNitabara('error','NITABARA','Error en API.');
          });
    }

    const onFinish = (values) => {
        SetEditUser({ variables: {
            ID:parseInt(props.ID),
            Email: values.Email,
            Telefono: values.Telefono,
            barrio: values.barrio,
            calle: values.calle,
            casa: values.casa,
            ci: values.ci,
            ciudad: values.ciudad,
            documento: values.documento,
            materno: values.materno,
            paterno: values.paterno,
            nombre: values.nombre,
            usuario: values.usuario,
            zona: values.zona,
            nacimiento: GetDateToMomment(values.nacimiento)
        } }).then(({ data }) => {
            let x = false;
            if (data.Editar_Usuario!=null) {
                if (data.Editar_Usuario.response) {
                    x = true;
                    NotificacionNitabara('success','NITABARA','Usuario editado exitosamente.');
                }
            }
            if (x == false) {
                NotificacionNitabara('error','NITABARA','Error en API.');
            }
          })
          .catch(e => {
            NotificacionNitabara('error','NITABARA','Error en API.');
          });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    
    const onSearch = (value) => {
        console.log('search:', value);
    };
    if (Cuenta=="No Data") {
        return <ErrorNULL />;
    }else if (Cuenta!=null) {
        return (
            <Form name="basic" labelCol={{span: 6}} wrapperCol={{span: 16}} style={{textAlign:'left'}} initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
            initialValues={{
                nombre : Data_User.Usuario.Persona.Nombre,
                paterno : Data_User.Usuario.Persona.Paterno,
                materno : Data_User.Usuario.Persona.Materno,
                Email : Data_User.Usuario.Persona.Correo,
                Telefono : Data_User.Usuario.Persona.Telefono,
                nacimiento : moment(Data_User.Usuario.Persona.Nacimiento,dateFormat),
                ci : Data_User.Usuario.Persona.CI,
                calle : Data_User.Usuario.Persona.Direccion.Calle,
                casa : Data_User.Usuario.Persona.Direccion.Casa,
                usuario : Data_User.Usuario.Usuario
            }} >
                <Form.Item label="Nombre" name="nombre" rules={[{required: true,message: 'Ingrese el usuario!'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Apellido Paterno" name="paterno" rules={[{required: true,message: 'Ingrese el Apellido Paterno!'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Apellido Materno" name="materno" rules={[{required: true,message: 'Ingrese el Apellido Materno!'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="Email" rules={[{required: true,message: 'Ingrese el Emal!'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Telefono" name="Telefono" rules={[{required: true,message: 'Ingrese el Numero de Telefono!'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Fecha de Nacimiento" name="nacimiento" rules={[{required: true,message: 'Ingrese la Fecha de Nacimiento!'}]}>
                    <DatePicker style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item label="Tipo de Documento" initialValue={Data_User.Usuario.Persona.TipoDocumento.ID} name="documento" rules={[{required: true,message: 'Seleccione el Tipo de Documento!'}]}>
                    <Select showSearch placeholder="Seleccione un Tipo de Documento" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                        {
                            Data_TipoDoc!=null
                            ? Data_TipoDoc.TipoDocumentos.map((d) => (
                                <Select.Option key={'Option_doc'+d.ID} value={d.ID}>{d.Nombre}</Select.Option>
                            ))
                            : null
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="CI" name="ci" rules={[{required: true,message: 'Ingrese el CI!'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Ciudad" initialValue={Data_User.Usuario.Persona.Ciudad.ID} name="ciudad" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
                    <Select showSearch placeholder="Seleccione una Ciudad" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                        {
                            Data_Ciudades!=null
                            ? Data_Ciudades.Ciudades.map((d) => (
                                <Select.Option key={'Option_city'+d.ID} value={d.ID}>{d.Nombre}</Select.Option>
                            ))
                            : null
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Zona" initialValue={Data_User.Usuario.Persona.Direccion.Zona.ID} name="zona" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
                    <Select showSearch placeholder="Seleccione una Zona" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                        {
                            Data_Zonas!=null
                            ? Data_Zonas.Zonas.map((d) => (
                                <Select.Option key={'Option_zona'+d.ID} value={d.ID}>{d.Nombre}</Select.Option>
                            ))
                            : null
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Barrio" initialValue={Data_User.Usuario.Persona.Direccion.Barrio.ID} name="barrio" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
                    <Select showSearch placeholder="Seleccione un Barrio" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                        {
                            Data_Barrios!=null
                            ? Data_Barrios.Barrios.map((d) => (
                                <Select.Option key={'Option_barrio'+d.ID} value={d.ID}>{d.Nombre}</Select.Option>
                            ))
                            : null
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="Calle" name="calle" rules={[{required: true,message: 'Ingrese la Direccion!'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Casa" name="casa" rules={[{required: true,message: 'Ingrese la Direccion!'}]} >
                    <Input />
                </Form.Item>
                <Form.Item label="Usuario" name="usuario" rules={[{required: true,message: 'Ingrese su Usuario!'}]}>
                    <Input />
                </Form.Item>
    
                <Form.Item wrapperCol={{offset: 0,span: 12}} >
                    <Button type="primary" htmlType="submit">
                        Editar Usuario
                    </Button>
                    <Button type="primary" onClick={()=>EliminarUser()} style={{backgroundColor:'red',borderColor:'red',marginLeft:'10px'}}>
                        Eliminar
                    </Button>
                </Form.Item>
                
            </Form>
        );
    }else{
        return <Cargando />;
    }
};

export default EditarUsuario;