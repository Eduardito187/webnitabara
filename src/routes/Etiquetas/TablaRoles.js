import { Row, Col, Button, Radio, Table, Input, Divider } from 'antd';
import {EditOutlined} from '@ant-design/icons';
import { useMutation,useLazyQuery } from '@apollo/client';
import {RolesAPI,IrUrlNitabara} from "./../../query/consultas";
import React, { useState } from 'react';
import Cargando from './Cargando';
import ErrorDB from './ErrorDB';
import ErrorNULL from './ErrorNULL';
const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Rol',
    dataIndex: 'Rol',
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
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const TablaRoles = (props) => {
  const [GetRolesAPI, { loading:Cargando_Roles, error:Error_Roles, data:Data_Roles }] = useLazyQuery(RolesAPI);

  React.useEffect(() => {
    GetRolesAPI();
  }, []);

  if (Cargando_Roles || Cargando_Roles == null){
    return <Cargando />;
  }
  if (Error_Roles){
    return <ErrorDB />
  }
  if (Data_Roles!=null) {
    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Button type="primary" onClick={()=>IrUrlNitabara("/RegistrarRol")}>
              Agregar Rol
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
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={Data_Roles.Roles}
        />
      </div>
    );
  }else{
    return <ErrorNULL />;
  }
};

export default TablaRoles;