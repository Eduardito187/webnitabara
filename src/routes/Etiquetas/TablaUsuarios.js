import {EditOutlined} from '@ant-design/icons';
import { Row, Col, Button, Table, Input, Divider } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {UsuariosLista,IrUrlNitabara} from '../../query/consultas';
import Cargando from "./Cargando";
import ErrorDB from './ErrorDB';
import ErrorNULL from './ErrorNULL';

const columns = [
  {
    title: 'Usuario',
    dataIndex: 'Usuario',
    key: 'ID+Math.random()',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nombre',
    dataIndex: 'Persona',
    key: 'ID+Math.random()',
    render: (text) => <a>{text.Nombre}</a>
  },
  {
    title: 'Apellidos',
    dataIndex: 'Persona',
    key: 'ID+Math.random()',
    render: (text) => <a>{text.Paterno+' '+text.Materno}</a>
  },
  {
    title: 'Correo',
    dataIndex: 'Persona',
    key: 'ID+Math.random()',
    render: (text) => <a>{text.Correo}</a>
  },
  {
    title: 'Telefono',
    dataIndex: 'Persona',
    key: 'ID+Math.random()',
    render: (text) => <a>{text.Telefono}</a>
  },
  {
    title: 'Documento',
    dataIndex: 'Persona',
    key: 'ID+Math.random()',
    render: (text) => <a>{text.CI}</a>
  },
  {
    title: 'Tipo Documento',
    dataIndex: 'Persona',
    key: 'ID+Math.random()',
    render: (text) => <a>{text.TipoDocumento.Nombre}</a>
  },
  {
    title: 'Accion',
    dataIndex: 'ID',
    key: 'ID+Math.random()',
    render: (text) => <Button icon={<EditOutlined />} onClick={()=>IrUrlNitabara("/Usuario/"+text)}>Editar</Button>
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

const TablaUsuarios = () => {
  function validarAcciones() {
    getData();
  }
  const [getData, { loading, error, data }] = useLazyQuery(UsuariosLista);

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
            <Button type="primary" onClick={()=>IrUrlNitabara("/RegistrarUsuario")}>
              Agregar Usuario
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
        <Table key={'TABLA'} rowSelection={{type: "checkbox",...rowSelection,}} columns={columns} dataSource={data.Usuarios} />
      </div>
      );
  }else{
    validarAcciones();
    return <ErrorNULL />;
  }
};

export default TablaUsuarios;