import {EditOutlined} from '@ant-design/icons';
import { Row, Col, Button, Table, Input, Divider, Checkbox } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {UsuariosLista,IrUrlNitabara, MultipleListDeleteUsers} from '../../query/consultas';
import MarcoRol from './MarcoRol';
import Cargando from "./Cargando";
import ErrorDB from './ErrorDB';
import ErrorNULL from './ErrorNULL';
import { NotificacionNitabara } from './Notificar';

const TablaUsuarios = () => {

  React.useEffect(() => {
    getData();
  }, []);

  const [EliminarMuchos, { loading:Cargando_API, error:Error_API, data:Data_API }] = useMutation(MultipleListDeleteUsers);
                                                      //aqui esta la consulta
  const [getData, { loading, error, data }] = useLazyQuery(UsuariosLista);

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
        if (data.ListDeleteUsers.response) {
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
            <Button type="primary" onClick={()=>IrUrlNitabara("/RegistrarUsuario")}>
              Agregar Usuario
            </Button>
          </Col>
          <Col span={8}>
          </Col>
          <Col span={6}>
            <Input.Search allowClear style={{ width: '100%' }} defaultValue="" />
          </Col>
        </Row>
        <Divider />
        <Table key={'TABLA'} columns={Columnas} dataSource={data.Usuarios} />
      </div>
      );
  }else{
    return <ErrorNULL />;
  }
};

export default TablaUsuarios;