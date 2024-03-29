import { Row, Col, Table, Input, Divider,Tooltip, Button, DatePicker, Drawer, Form, Select, Space,Card,InputNumber } from 'antd';
import React, { useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { useMutation,useLazyQuery } from '@apollo/client';
import NuevoCliente from '../../Clientes/Componentes/NuevoCliente';
import NuevoMedico from '../../Medicos/Componentes/NuevoMedico';
import {GetPersonasSelect,GetMedicosSelect, CreateExamen} from './../../../query/consultas';
import { NotificacionNitabara } from '../../Etiquetas/Notificar';
import { GetDateToMommentTime } from '../../../helpers/GetDate';
const { Option } = Select;

const AddExamen = () => {
    const [form] = Form.useForm();
    const [New_Pacientes, SetNew_Pacientes] = useState(false);
    const [New_Doctores, SetNew_Doctores] = useState(false);
    const [GetPacientes, { loading:Cargando_Pacientes, error:Error_Pacientes, data:Data_Pacientes }] = useLazyQuery(GetPersonasSelect);
    const [GetMedicos, { loading:Cargando_Medicos, error:Error_Medicos, data:Data_Medicos }] = useLazyQuery(GetMedicosSelect);
    const [SetExamen, { loading:Cargando_Consulta, error:Error_Consulta, data:Data_Consulta }] = useMutation(CreateExamen);

    React.useEffect(() => {
        GetPacientes();
        GetMedicos();
    }, []);

    const onFinish = (values) => {
        SetExamen({ variables: {
            Usuario:parseInt(localStorage.ID_USER),
            Paciente:values.Paciente,
            Medico:values.Medico,
            Descripcion:values.Descripcion,
            Precio:parseFloat(values.Precio)
        } });
        form.resetFields();
        NotificacionNitabara('success','NITABARA','Laboratorio registrado exitosamente.');
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


    const showDrawerPacientes = () => {
        SetNew_Pacientes(true);
    };
    const onClosePacientes = () => {
        GetPacientes();
        SetNew_Pacientes(false);
    };

    const showDrawerDoctores = () => {
        SetNew_Doctores(true);
    };
    const onCloseDoctores = () => {
        GetMedicos();
        SetNew_Doctores(false);
    };

    return (
        <Card title="Nuevo Laboratorio" bordered={false} style={{ width: '100%' }}>
            <Form form={form} layout="vertical" hideRequiredMark onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                <Row gutter={16}>
                    <Col span={12}>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Tooltip title="Nuevo paciente">
                                    <Button type="primary" onClick={showDrawerPacientes} shape="circle" icon={<UserAddOutlined />} />
                                </Tooltip>
                            </Col>
                            <Col span={20}>
                                <Form.Item label="Paciente" name="Paciente" rules={[{required: true,message: 'Ingrese el paciente'}]}>
                                    <Select showSearch placeholder="Seleccione un paciente" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                                        {
                                            Data_Pacientes!=null
                                            ? Data_Pacientes.Personas.map((d) => (
                                                <Select.Option value={d.ID}>{d.CI+" - "+d.Nombre+" "+d.Paterno+" "+d.Materno}</Select.Option>
                                            ))
                                            : null
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Tooltip title="Nuevo medico">
                                    <Button type="primary" onClick={showDrawerDoctores} shape="circle" icon={<UserAddOutlined />} />
                                </Tooltip>
                            </Col>
                            <Col span={20}>
                                <Form.Item label="Medico" name="Medico" rules={[{required: true,message: 'Ingrese su medico'}]}>
                                    <Select showSearch placeholder="Seleccione un medico" optionFilterProp="children" onChange={onChange} onSearch={onSearch} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                                        {
                                            Data_Medicos!=null
                                            ? Data_Medicos.Medicos.map((d) => (
                                                <Select.Option value={d.ID}>{d.Persona.CI+" - "+d.Persona.Nombre+" "+d.Persona.Paterno+" "+d.Persona.Materno}</Select.Option>
                                            ))
                                            : null
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item name="Descripcion" label="Descripcion" rules={[{required: true,message: 'Ingrese el descripcion'}]}>
                            <Input.TextArea rows={4} placeholder="Descripcion" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="Precio" label="Precio" rules={[{required: true,message: 'Ingrese el precio'}]}>
                            <InputNumber min={1} style={{width:'100%'}} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12} style={{textAlign:'left'}}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Registrar laboratorio
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Drawer title="Registrar Paciente" width={720} onClose={onClosePacientes} visible={New_Pacientes} bodyStyle={{paddingBottom: 80,}}
                extra={
                <Space>
                    <Button onClick={onClosePacientes}>Cancelar</Button>
                </Space>}>
                <NuevoCliente />
            </Drawer>
            <Drawer title="Registrar Medico" width={720} onClose={onCloseDoctores} visible={New_Doctores} bodyStyle={{paddingBottom: 80,}}
                extra={
                <Space>
                    <Button onClick={onCloseDoctores}>Cancelar</Button>
                </Space>}>
                    <NuevoMedico />
            </Drawer>
        </Card>
    );
};
export default AddExamen;