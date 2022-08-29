import {EditOutlined} from '@ant-design/icons';
import { Row, Col, Button, Table, Input, Divider, Tag, Select } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {GetExamenes,IrUrlNitabara} from './../../../query/consultas';
import Cargando from "../../Etiquetas/Cargando";
import ErrorDB from './../../Etiquetas/ErrorDB';
import ErrorNULL from './../../Etiquetas/ErrorNULL';
const { Option } = Select;

const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
    render: (text) => <b>{text}</b>,
  },
  {
    title: 'Paciente',
    dataIndex: 'Persona',
    key: 'ID+Math.random()',
    render: (text) => <b>{text.Nombre+" "+text.Paterno+" "+text.Materno}</b>
  },
  {
    title: 'Medico',
    dataIndex: 'Medico',
    key: 'ID+Math.random()',
    render: (text) => <b><Tag color="success">{text.Persona.CI}</Tag> : <Tag color="default">{text.Persona.Nombre+" "+text.Persona.Paterno+" "+text.Persona.Materno}</Tag> : <Tag color="warning">{text.Persona.Telefono}</Tag></b>
  },
  {
    title: 'Especialidad',
    dataIndex: 'Medico',
    key: 'ID+Math.random()',
    render: (text) => <b>{text.Especialidad.Nombre}</b>
  },
  {
    title: 'Usuario',
    dataIndex: 'Medico',
    key: 'ID+Math.random()',
    render: (text) => <b>{text.Usuario.Usuario}</b>
  },
  {
    title: 'Pago',
    dataIndex: 'Pago',
    key: 'ID+Math.random()',
    render: (text) => <b><Tag color="processing">{text.Total+"bs"}</Tag></b>
  },
  {
    title: 'Accion',
    dataIndex: 'ID',
    key: 'ID+Math.random()',
    render: (text) => <Button icon={<EditOutlined />} onClick={()=>IrUrlNitabara("/EditarLaboratorio/"+text)}>Editar</Button>
  }
];

const Tabla = () => {
  function validarAcciones() {
    getData();
  }
  const [getData, { loading, error, data }] = useLazyQuery(GetExamenes);
  const [Filtro,SetFiltro] = React.useState("");
  const onChange = (value) => {
    SetFiltro(value);
  };
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportarExcel = () => {
  }

  if (loading){
    return <Cargando />;
  }
  if (error){
    return <ErrorDB />
  }
  if (data!=null) {
    return (
      <div>
        <Row gutter={16}>
          <Col span={10}>
            <Button type="primary" onClick={()=>IrUrlNitabara("/NuevoExamen")}>
              Registro Laboratorio
            </Button>
            <Button type="primary" style={{backgroundColor:'red',borderColor:'red',marginLeft:'10px'}}>
              Eliminar
            </Button>
            <Button type="success" style={{marginLeft:'10px'}} onClick={()=>exportarExcel}>
              Exportar Data
            </Button>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={6}>
            <Row gutter={16}>
              <Col span={8}>
                <Select style={{width:'100%'}} placeholder="Filtro" optionFilterProp="children" onChange={onChange} filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())} >
                  <Option value="Paciente">Paciente</Option>
                  <Option value="Medico">Medico</Option>
                  <Option value="Especialidad">Especialidad</Option>
                </Select>
              </Col>
              <Col span={16}>
                <Input.Search allowClear style={{width:'100%'}} defaultValue="" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <Table key={'TABLA'} columns={columns} dataSource={data.Examenes} />
      </div>
      );
  }else{
    validarAcciones();
    return <ErrorNULL />;
  }
};

export default Tabla;