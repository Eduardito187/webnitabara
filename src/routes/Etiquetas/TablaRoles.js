import { Divider, Radio,Button, Table } from 'antd';
import {EditOutlined} from '@ant-design/icons';
import { useMutation,useLazyQuery } from '@apollo/client';
import {RolesAPI} from "./../../query/consultas";
import React, { useState } from 'react';
import Cargando from './Cargando';
import ErrorDB from './ErrorDB';
import ErrorNULL from './ErrorNULL';
function editRANGO(a) {
  window.location.href = a;
}
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
    render: (text) => <Button icon={<EditOutlined />} onClick={()=>editRANGO("/Usuario/"+text)}>Editar</Button>
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
  const load = React.useState(false);
  const [GetRolesAPI, { loading:Cargando_Roles, error:Error_Roles, data:Data_Roles }] = useLazyQuery(RolesAPI);

  React.useEffect(() => {
    GetRolesAPI();
  }, [load]);

  if (Cargando_Roles || Cargando_Roles == null){
    return <Cargando />;
  }
  if (Error_Roles){
    return <ErrorDB />
  }
  if (Data_Roles!=null) {
    return (
      <div>
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