import { Row, Col, Button, Radio, Table, Input, Divider, Checkbox } from 'antd';
import {EditOutlined} from '@ant-design/icons';
import { useMutation,useLazyQuery } from '@apollo/client';
import {RolesAPI,IrUrlNitabara,MultipleListDeleteRoles} from "./../../query/consultas";
import React, { useState } from 'react';
import Cargando from './Cargando';
import ErrorDB from './ErrorDB';
import ErrorNULL from './ErrorNULL';
import { NotificacionNitabara } from './Notificar';
import MarcoRol from './MarcoRol';

const TablaRoles = (props) => {
  const [GetRolesAPI, { loading:Cargando_Roles, error:Error_Roles, data:Data_Roles }] = useLazyQuery(RolesAPI);
  const [EliminarMuchos, { loading:Cargando_API, error:Error_API, data:Data_API }] = useMutation(MultipleListDeleteRoles);

  React.useEffect(() => {
    GetRolesAPI();
  }, []);

  const [Columnas,SetColumnas] = React.useState(
    [
      {
        title: 'Select',
        dataIndex: 'ID',
        key: 'ID+Math.random()+"_SELECT"',
        render: (text) => (
          <Checkbox onChange={(e)=>onChangeSelect(e,text)} />
        )
      },
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
        render: (text) => <Button icon={<EditOutlined />} onClick={()=>IrUrlNitabara("/EditarRol/"+text)}>Editar</Button>
      }
    ]
  );
  const [ShowDelete,SetShowDelete] = React.useState(false);
  const [IDDelete,SetIDDelete] = React.useState([]);

  const onChangeSelect = (e,ID) => {
    SelectID(ID);
  };
  const SelectID = (ID) => {
    const IDS = IDDelete;
    let Limpieza = false;
    for (let index = 0; index < IDS.length; index++) {
      if (IDS[index] == ID) {
        IDS.splice(index,1);
        Limpieza = true;
      }
    }
    if (Limpieza == false) {
      IDS.push(parseInt(ID));
    }
    if (IDS.length > 0) {
      SetShowDelete(true);
    }else{
      SetShowDelete(false);
    }
    SetIDDelete(IDS);
  };
  const EliminarMultiplesApi = () => {
    const IDS = IDDelete;
    if (IDS.length > 0) {
      EliminarMuchos({ variables: {ID:IDS}}).then(({ data }) => {
        if (data.ListDeleteRoles.response) {
          NotificacionNitabara('success','NITABARA','Elementos eliminados.');
          SetShowDelete(false);
          SetIDDelete([]);
        }else{
          NotificacionNitabara('error','NITABARA','Error al eliminar.');
        }
        window.location.reload();
      })
      .catch(e => {
        NotificacionNitabara('error','NITABARA','Error en API.');
      });
    }else{
      NotificacionNitabara('error','NITABARA','Lista en blanco.');
    }
  };

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
          <Col span={10} style={{textAlign:'left',display:'flex'}}>
            {
              ShowDelete
              ? (
                <Button onClick={()=>EliminarMultiplesApi()} type="primary" style={{backgroundColor:'red',borderColor:'red',marginLeft:'10px',marginRight:'10px'}}>
                  Eliminar
                </Button>
              )
              : null
            }
            <Button type="primary" onClick={()=>IrUrlNitabara("/RegistrarRol")}>
              Agregar Rol
            </Button>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={6}>
            <Input.Search allowClear style={{ width: '100%' }} defaultValue="" />
          </Col>
        </Row>
        <Divider />
        <Table columns={Columnas} dataSource={Data_Roles.Roles}
        />
      </div>
    );
  }else{
    return <ErrorNULL />;
  }
};

export default TablaRoles;