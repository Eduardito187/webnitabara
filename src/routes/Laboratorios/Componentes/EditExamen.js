import { Row, Col, Table, Input, Divider,Tooltip, Button, DatePicker, Drawer, Form, Select, Space,Card,InputNumber } from 'antd';
import React, { useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { useMutation,useLazyQuery } from '@apollo/client';
import NuevoCliente from '../../Clientes/Componentes/NuevoCliente';
import NuevoMedico from '../../Medicos/Componentes/NuevoMedico';
import {GetPersonasSelect,GetMedicosSelect, GetExamen, NitaEditExamen} from './../../../query/consultas';
import { GetDateToMommentTime } from '../../../helpers/GetDate';
import { useParams } from 'react-router';
import Cargando from '../../Etiquetas/Cargando';
import { NotificacionNitabara } from '../../Etiquetas/Notificar';
const { Option } = Select;

const EditExamen = () => {
    const [form] = Form.useForm();
    const { ID } = useParams();
    const [DATA, SetDATA] = useState(null);
    const [New_Pacientes, SetNew_Pacientes] = useState(false);
    const [New_Doctores, SetNew_Doctores] = useState(false);
    const [GetPacientes, { loading:Cargando_Pacientes, error:Error_Pacientes, data:Data_Pacientes }] = useLazyQuery(GetPersonasSelect);
    const [GetMedicos, { loading:Cargando_Medicos, error:Error_Medicos, data:Data_Medicos }] = useLazyQuery(GetMedicosSelect);
    const [GetGetExamenAPI, { loading:Cargando_GetExamen, error:Error_GetExamen, data:Data_GetExamen }] = useLazyQuery(GetExamen);
    const [SetExamen, { loading:Cargando_Consulta, error:Error_Consulta, data:Data_Consulta }] = useMutation(NitaEditExamen);

    React.useEffect(() => {
        GetGetExamenAPI({ variables: {ID:parseInt(ID)}}).then(({ data }) => {
            if (data.Examen!=null) {
                SetDATA(data.Examen);
            }else{
                SetDATA(null);
            }
          })
          .catch(e => {
            NotificacionNitabara('error','NITABARA','Error en API.');
          });
        GetPacientes();
        GetMedicos();

    }, []);

    const onFinish = (values) => {
        SetExamen({ variables: {
            ID:parseInt(ID),
            Usuario:parseInt(localStorage.ID_USER),
            Paciente:values.Paciente,
            Medico:values.Medico,
            Descripcion:values.Descripcion,
            Precio:parseFloat(values.Precio)
        }});
        NotificacionNitabara('success','NITABARA','Laboratorio editado exitosamente.');
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

    if (DATA == null) {
        return (
            <Card title="Cargando" bordered={false} style={{ width: '100%',textAlign:'center' }}>
                <Cargando />
            </Card>
        );
    }else{
        return (
            <Card title={'Laboratorio ID: '+ID} bordered={false} style={{ width: '100%' }}>
                <Form form={form} initialValues={{
                    Paciente:DATA.Persona != null ? DATA.Persona.ID : "",
                    Medico:DATA.Medico != null ? DATA.Medico.ID : "",
                    Descripcion:DATA.Descripcion != null ? DATA.Descripcion : "",
                    Precio:DATA.Pago.Total != null ? DATA.Pago.Total : ""
                    }} layout="vertical" hideRequiredMark onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
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
                                    Editar Laboratorio
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
    }
};
export default EditExamen;