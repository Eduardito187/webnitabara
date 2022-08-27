import {EditOutlined} from '@ant-design/icons';
import { Row, Col, Button, Table, Input, Divider, Tag } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {IrUrlNitabara, Cirugias} from '../../../query/consultas';
import Cargando from "../../Etiquetas/Cargando";
import ErrorDB from '../../Etiquetas/ErrorDB';
import ErrorNULL from '../../Etiquetas/ErrorNULL';

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
    render: (text) => <Button icon={<EditOutlined />} onClick={()=>IrUrlNitabara("/EditarCirugia/"+text)}>Editar</Button>
  }
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    //disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const Tabla = () => {
  function validarAcciones() {
    getData();
  }
  const [getData, { loading, error, data }] = useLazyQuery(Cirugias);

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
          <Col span={6}>
            <Button type="primary" onClick={()=>IrUrlNitabara("/NuevaCirugia")}>
              Registrar Cirugia
            </Button>
            <Button type="primary" style={{backgroundColor:'red',borderColor:'red',marginLeft:'10px'}}>
              Eliminar
            </Button>
          </Col>
          <Col span={12}>
          </Col>
          <Col span={6}>
            <Input.Search allowClear style={{ width: '100%' }} defaultValue="" />
          </Col>
        </Row>
        <Divider />
        <Table key={'TABLA'} rowSelection={{type: "checkbox",...rowSelection,}} columns={columns} dataSource={data.Cirugias} />
      </div>
      );
  }else{
    validarAcciones();
    return <ErrorNULL />;
  }
};

export default Tabla;