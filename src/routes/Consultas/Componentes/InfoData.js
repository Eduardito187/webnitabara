import {EditOutlined,EyeOutlined} from '@ant-design/icons';
import { Row, Col, Button, Table, Input, Divider, Tag, Select, Card, Checkbox, Drawer, Space,Form } from 'antd';
import React, { useState } from 'react';
import Cargando from "../../Etiquetas/Cargando";
const { Option } = Select;

const InfoData = (props) => {
    const [DataShow,SetDataShow] = React.useState(false);
    React.useEffect(() => {
        SetDataShow(true);
    }, []);

    if (DataShow == false) {
        return (
            <Card title="Cargando" bordered={false} style={{ width: '100%',textAlign:'center' }}>
                <Cargando />
            </Card>
        );
    }else {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={24} style={{textAlign:'left',padding:'5px'}}>
                        <Card title="Medico" bordered={true} style={{width: '100%'}}>
                            {
                                props.DATA.Medico != null
                                ? (
                                    <Row gutter={16}>
                                        <Col span={24} style={{textAlign:'left',padding:'5px'}}>
                                            <Card title="Especialidad" bordered={true} style={{width: '100%'}}>
                                                <p style={{padding:'0px'}}><b>Nombre : </b>{props.DATA.Medico.Especialidad.Nombre}</p>
                                                <p style={{padding:'0px'}}><b>Descripcion : </b>{props.DATA.Medico.Especialidad.Descripcion}</p>
                                            </Card>
                                        </Col>
                                        <Col span={24} style={{textAlign:'left',padding:'5px'}}>
                                            <Card title="Informacion" bordered={true} style={{width: '100%'}}>
                                                <p style={{padding:'0px'}}><b>CI : </b>{props.DATA.Medico.Persona.CI}</p>
                                                <p style={{padding:'0px'}}><b>Correo : </b>{props.DATA.Medico.Persona.Correo}</p>
                                                <p style={{padding:'0px'}}><b>Nombre : </b>{props.DATA.Medico.Persona.Nombre}</p>
                                                <p style={{padding:'0px'}}><b>Apellido Paterno : </b>{props.DATA.Medico.Persona.Paterno}</p>
                                                <p style={{padding:'0px'}}><b>Apellido Materno : </b>{props.DATA.Medico.Persona.Materno}</p>
                                                <p style={{padding:'0px'}}><b>Telefono : </b>{props.DATA.Medico.Persona.Telefono}</p>
                                                <p style={{padding:'0px'}}><b>Fecha de Nacimiento : </b>{props.DATA.Medico.Persona.Nacimiento}</p>
                                            </Card>
                                        </Col>
                                        <Col span={24} style={{textAlign:'left',padding:'5px'}}>
                                            <Card title="Usuario" bordered={true} style={{width: '100%'}}>
                                                <p style={{padding:'0px'}}><b>Estado : </b>{props.DATA.Medico.Usuario.State}</p>
                                                <p style={{padding:'0px'}}><b>Usuario : </b>{props.DATA.Medico.Usuario.Usuario}</p>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                                : null
                            }
                        </Card>
                    </Col>
                    <Col span={24} style={{textAlign:'left',padding:'5px'}}>
                        <Card title="Paciente" bordered={true} style={{width: '100%'}}>
                            {
                                props.DATA.Pago != null
                                ? (

                                    <Row gutter={16}>
                                        <Col span={24} style={{textAlign:'left',padding:'5px'}}>
                                            <Card title="Informacion" bordered={true} style={{width: '100%'}}>
                                                <p style={{padding:'0px'}}><b>CI : </b>{props.DATA.Persona.CI}</p>
                                                <p style={{padding:'0px'}}><b>Correo : </b>{props.DATA.Persona.Correo}</p>
                                                <p style={{padding:'0px'}}><b>Nombre : </b>{props.DATA.Persona.Nombre}</p>
                                                <p style={{padding:'0px'}}><b>Paterno : </b>{props.DATA.Persona.Paterno}</p>
                                                <p style={{padding:'0px'}}><b>Materno : </b>{props.DATA.Persona.Materno}</p>
                                                <p style={{padding:'0px'}}><b>Telefono : </b>{props.DATA.Persona.Telefono}</p>
                                                <p style={{padding:'0px'}}><b>Nacimiento : </b>{props.DATA.Persona.Nacimiento}</p>
                                            </Card>
                                        </Col>
                                    </Row>
                                )
                                : null
                            }
                        </Card>
                    </Col>
                    <Col span={24} style={{textAlign:'left',padding:'5px'}}>
                        <Card title="Precio" bordered={true} style={{width: '100%'}}>
                            {
                                props.DATA.Pago != null
                                ? <p style={{padding:'0px'}}>
                                    <b>Monto : </b>{props.DATA.Pago.Total} Bs
                                    </p>
                                : null
                            }
                        </Card>
                    </Col>
                    <Col span={24} style={{textAlign:'left',padding:'5px'}}>
                        <Card title="Descripcion" bordered={true} style={{width: '100%'}}>
                            {
                                props.DATA != null
                                ? <p style={{padding:'0px'}}><b>Descripcion : </b>{props.DATA.Descripcion}</p>
                                : null
                            }
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default InfoData;