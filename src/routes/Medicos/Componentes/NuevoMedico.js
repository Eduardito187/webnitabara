import { Row, Col, Table, Input, Divider, Button, DatePicker, Drawer, Form, Select, Space,Card } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Ciudades,NuevoUsuario,TiposDocumentos,Barrios,Zonas,GetEspecialidades, Nuevo_Medico} from './../../../query/consultas';
import { GetDateToMomment } from '../../../helpers/GetDate';
import { NotificacionNitabara } from '../../Etiquetas/Notificar';
const { Option } = Select;

const NuevoMedico = () => {
    const [form] = Form.useForm();
    const [SetUser, { loading:Cargando_User, error:Error_User, data:Data_User }] = useMutation(Nuevo_Medico);
    const [GetCiudad, { loading:Cargando_Ciudad, error:Error_Ciudad, data:Data_Ciudades }] = useLazyQuery(Ciudades);
    const [GetBarrios, { loading:Cargando_Barrio, error:Error_Barrio, data:Data_Barrios }] = useLazyQuery(Barrios);
    const [GetTipoDoc, { loading:Cargando_TipoDoc, error:Error__TipoDoc, data:Data_TipoDoc }] = useLazyQuery(TiposDocumentos);
    const [GetZonas, { loading:Cargando_Zona, error:Error_Zona, data:Data_Zonas }] = useLazyQuery(Zonas);
    const [GetGetEspecialidades, { loading:Cargando_Especialidad, error:Error_Especialidad, data:Data_Especialidad }] = useLazyQuery(GetEspecialidades);

    React.useEffect(() => {
        GetCiudad();
        GetBarrios();
        GetTipoDoc();
        GetZonas();
        GetGetEspecialidades();
    }, []);

    const onFinish = (values) => {
        SetUser({ variables: {
            Email: values.Correo,
            Telefono: values.Telefono,
            barrio: values.Barrio,
            calle: values.Calle,
            casa: values.Casa,
            ci: values.CI,
            ciudad: values.Ciudad,
            contra: values.Contra,
            documento: values.Documento,
            materno: values.Materno,
            paterno: values.Paterno,
            nombre: values.Nombre,
            usuario: values.Usuario,
            zona: values.Zona,
            especialidad: values.Especialidad,
            nacimiento: GetDateToMomment(values.Nacimiento)
        } });
        form.resetFields();
        NotificacionNitabara('success','NITABARA','Medico registrado exitosamente.');
        window.location.reload();
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
        <Card title="Nuevo Medico" bordered={false} style={{ width: '100%' }}>
            <Form form={form} layout="vertical" hideRequiredMark onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Usuario" name="Usuario" rules={[{required: true,message: 'Ingrese su usuario'}]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Contra" name="Contra" rules={[{required: true,message: 'Ingrese su contra'}]}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="Nombre" label="Nombre" rules={[{required: true,message: 'Ingrese el nombre'}]}>
                            <Input placeholder="Nombre" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="Paterno" label="Apellido Paterno" rules={[{required: true,message: 'Ingrese el apellido paterno'}]}>
                            <Input placeholder="Apellido Paterno" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="Materno" label="Apellido Materno" rules={[{required: true,message: 'Ingrese el apellido materno'}]}>
                            <Input placeholder="Apellido Materno" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="CI" label="CI" rules={[{required: true,message: 'Ingrese el CI'}]}>
                            <Input placeholder="CI" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="Correo" label="Correo" rules={[{required: true,message: 'Ingrese el correo'}]}>
                            <Input placeholder="Correo" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="Telefono" label="Telefono" rules={[{required: true,message: 'Ingrese el telefono'}]}>
                            <Input placeholder="Telefono" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Tipo de Documento" name="Documento" rules={[{required: true,message: 'Seleccione el Tipo de Documento!'}]}>
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
                    </Col>
                    <Col span={12}>
                        <Form.Item name="Nacimiento" label="Fecha de nacimiento" rules={[{required: true,message: 'Fecha de nacimiento'}]}>
                            <DatePicker placeholder="Fecha de nacimiento" style={{width:'100%'}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Ciudad" name="Ciudad" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
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
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Zona" name="Zona" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
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
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Barrio" name="Barrio" rules={[{required: true,message: 'Seleccione la Ciudad!'}]}>
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
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Calle" name="Calle" rules={[{required: true,message: 'Ingrese la direccion'}]} >
                            <Input placeholder="Calle" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Casa" name="Casa" rules={[{required: true,message: 'Ingrese numero de casa'}]} >
                            <Input placeholder="Casa" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Especialidad" name="Especialidad" rules={[{required: true,message: 'Seleccione la especialidad'}]}>
                            <Select showSearch placeholder="Seleccione una Especialidad" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                                {
                                    Data_Especialidad!=null
                                    ? Data_Especialidad.Especialidades.map((d) => (
                                        <Select.Option value={d.ID}>{d.Nombre}</Select.Option>
                                    ))
                                    : null
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12} style={{textAlign:'left'}}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Registrar Medico
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
export default NuevoMedico;