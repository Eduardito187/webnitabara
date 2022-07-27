import { Button, Select, Form, Input, DatePicker } from 'antd';
import * as React from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Ciudades,Zonas,Barrios,TiposDocumentos,NuevoUsuario} from "./../../query/consultas";
import {NotificacionNitabara} from "./Notificar";

const CrearUsuario = () => {
    const [form] = Form.useForm();
    const [SetUser, { loading:Cargando_User, error:Error_User, data:Data_User }] = useMutation(NuevoUsuario);
    const [GetCiudad, { loading:Cargando_Ciudad, error:Error_Ciudad, data:Data_Ciudades }] = useLazyQuery(Ciudades);
    const [GetBarrios, { loading:Cargando_Barrio, error:Error_Barrio, data:Data_Barrios }] = useLazyQuery(Barrios);
    const [GetTipoDoc, { loading:Cargando_TipoDoc, error:Error__TipoDoc, data:Data_TipoDoc }] = useLazyQuery(TiposDocumentos);
    const [GetZonas, { loading:Cargando_Zona, error:Error_Zona, data:Data_Zonas }] = useLazyQuery(Zonas);

    React.useEffect(() => {
        GetCiudad();
        GetBarrios();
        GetTipoDoc();
        GetZonas();
    }, []);

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const onFinish = (values) => {
        let date_time = "";
        if (values.nacimiento._i!=null) {
            date_time = values.nacimiento._i;
        }else{
            date_time = formatDate(values.nacimiento._d);
        }
        SetUser({ variables: {
            Email: values.Email,
            Telefono: values.Telefono,
            barrio: values.barrio,
            calle: values.calle,
            casa: values.casa,
            ci: values.ci,
            ciudad: values.ciudad,
            contra: values.contra,
            documento: values.documento,
            materno: values.materno,
            paterno: values.paterno,
            nombre: values.nombre,
            usuario: values.usuario,
            zona: values.zona,
            nacimiento: date_time
        } });
        console.log('Success:', values);
        form.resetFields();
        NotificacionNitabara('success','NITABARA','Usuario registrado exitosamente.');
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

  return (
    <Form name="basic" form={form} labelCol={{span: 6}} wrapperCol={{span: 16}} style={{textAlign:'left'}} initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
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
        <Form.Item label="Tipo de Documento" name="documento" rules={[{required: true,message: 'Seleccione el Tipo de Documento!'}]}>
            <Select showSearch placeholder="Seleccione un Tipo de Documento" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                {
                    Data_TipoDoc!=null
                    ? Data_TipoDoc.TipoDocumentos.map((d) => (
                        <Select.Option value={d.ID}>{d.Nombre}</Select.Option>
                    ))
                    : null
                }
            </Select>
        </Form.Item>
        <Form.Item label="CI" name="ci" rules={[{required: true,message: 'Ingrese el CI!'}]} >
            <Input />
        </Form.Item>
        <Form.Item label="Ciudad" name="ciudad" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
            <Select showSearch placeholder="Seleccione una Ciudad" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                {
                    Data_Ciudades!=null
                    ? Data_Ciudades.Ciudades.map((d) => (
                        <Select.Option value={d.ID}>{d.Nombre}</Select.Option>
                    ))
                    : null
                }
            </Select>
        </Form.Item>
        <Form.Item label="Zona" name="zona" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
            <Select showSearch placeholder="Seleccione una Zona" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                {
                    Data_Zonas!=null
                    ? Data_Zonas.Zonas.map((d) => (
                        <Select.Option value={d.ID}>{d.Nombre}</Select.Option>
                    ))
                    : null
                }
            </Select>
        </Form.Item>
        <Form.Item label="Barrio" name="barrio" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
            <Select showSearch placeholder="Seleccione un Barrio" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                {
                    Data_Barrios!=null
                    ? Data_Barrios.Barrios.map((d) => (
                        <Select.Option value={d.ID}>{d.Nombre}</Select.Option>
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
        <Form.Item label="Contra" name="contra" rules={[{required: true,message: 'Ingrese su Contra!'}]}>
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{offset: 0,span: 12}} >
            <Button type="primary" htmlType="submit">
                Registrar Usuario
            </Button>
        </Form.Item>
        
    </Form>
  );
};

export default CrearUsuario;