import {EditOutlined} from '@ant-design/icons';
import { Row, Col, Button, Table, Input, Divider, Tag, Select } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {IrUrlNitabara, Consultas} from './../../../query/consultas';
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
    title: 'Accion',
    dataIndex: 'ID',
    key: 'ID+Math.random()',
    render: (text) => <Button icon={<EditOutlined />} onClick={()=>IrUrlNitabara("/Consulta/"+text)}>Editar</Button>
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
  const [getData, { loading, error, data }] = useLazyQuery(Consultas);
  const [Filtro,SetFiltro] = React.useState("");
  const onChange = (value) => {
    SetFiltro(value);
  };

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
            <Button type="primary" onClick={()=>IrUrlNitabara("/NuevoCliente")}>
              Registrar Cliente
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
        <Table key={'TABLA'} rowSelection={{type: "checkbox",...rowSelection,}} columns={[]} dataSource={data.Consultas} />
      </div>
      );
  }else{
    validarAcciones();
    return <ErrorNULL />;
  }
};

export default Tabla;