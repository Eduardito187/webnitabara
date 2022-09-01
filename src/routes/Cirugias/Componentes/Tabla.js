import {EditOutlined,EyeOutlined} from '@ant-design/icons';
import { Row, Col, Button, Table, Input, Divider, Tag, Select, Card, Checkbox, Drawer, Space } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {IrUrlNitabara, Cirugias, MultipleDeleteCirugia} from '../../../query/consultas';
import Cargando from "../../Etiquetas/Cargando";
import InfoData from './InfoData';
import { NotificacionNitabara } from '../../Etiquetas/Notificar';
const { Option } = Select;

var DataTabla = [];
const Tabla = () => {
  const [getData, { loading, error, data }] = useLazyQuery(Cirugias);
  const [EliminarMuchos, { loading:Cargando_API, error:Error_API, data:Data_API }] = useMutation(MultipleDeleteCirugia);
  const [Filtro,SetFiltro] = React.useState("");
  const [VerInfoData,SetVerInfoData] = React.useState(false);
  const [DATA, SetDATA] = React.useState(null);
  const [DataShow,SetDataShow] = React.useState(false);
  const [IDDelete,SetIDDelete] = React.useState([]);
  const [ShowDelete,SetShowDelete] = React.useState(false);
  const [Columnas,SetColumnas] = React.useState(
    [
      {
        title: 'Select',
        dataIndex: 'ID',
        key: 'ID+Math.random()+"_SELECT"',
        render: (text) => <Checkbox onChange={(e)=>onChangeSelect(e,text)} />
      },
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
        title: 'Atencion',
        dataIndex: 'PersonaCirugia',
        key: 'ID+Math.random()',
        render: (text) => {
          if (text != null) {
            return <b>{text.HoraAtencion}</b>
          }
          return "";
        }
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
      },
      {
        title: 'Accion',
        dataIndex: 'ID',
        key: 'ID+Math.random()',
        render: (text) => <Button icon={<EyeOutlined />} onClick={()=>VerInfo(text)}>Ver Mas</Button>
      }
    ]
  );
  React.useEffect(() => {
    RecolectarApi();
  }, []);
  const RecolectarApi = () => {
    SetDataShow(false);
    DataTabla = null;
    getData().then(({ data }) => {
      if (data.Cirugias != null) {
        DataTabla = data.Cirugias;
        SetDataShow(true);
      }
    })
    .catch(e => {
      NotificacionNitabara('error','NITABARA','Error en API.');
    });
  };
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
  const VerInfo = (valueID) => {
    SetDATA(GetDataByID(valueID));
    SetVerInfoData(true);
  };
  const GetDataByID = (ID) => {
    let Data_Tabla = DataTabla;
    for (let index = 0; index < Data_Tabla.length; index++) {
      if (Data_Tabla[index]["ID"] == ID) {
        return Data_Tabla[index];
      }
    }
    return null;
  };
  const EliminarMultiplesApi = () => {
    const IDS = IDDelete;
    if (IDS.length > 0) {
      EliminarMuchos({ variables: {ID:IDS}}).then(({ data }) => {
        if (data.ListDeleteCirugia.response) {
          NotificacionNitabara('success','NITABARA','Elementos eliminados.');
          SetShowDelete(false);
          SetIDDelete([]);
        }else{
          NotificacionNitabara('error','NITABARA','Error al eliminar.');
        }
        RecolectarApi();
      })
      .catch(e => {
        NotificacionNitabara('error','NITABARA','Error en API.');
      });
    }else{
      NotificacionNitabara('error','NITABARA','Lista en blanco.');
    }
  };
  const onChange = (value) => {
    SetFiltro(value);
  };
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const exportarExcel = () => {
  }
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
          <Col span={10} style={{textAlign:'left'}}>
            {
              ShowDelete
              ? (<Button type="primary" onClick={()=>EliminarMultiplesApi()} style={{backgroundColor:'red',borderColor:'red',marginRight:'10px'}}>Eliminar</Button>)
              : null
            }
            <Button type="primary" onClick={()=>IrUrlNitabara("/NuevaCirugia")}>
              Registrar Cirugia
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
        {
          DataShow
          ? <Table key={'TABLA'} columns={Columnas} dataSource={DataTabla} />
          : null
        }
        <Drawer title={DATA != null ? "Cirugia ID : "+DATA.ID : ""} width={720} onClose={()=>SetVerInfoData(false)} visible={VerInfoData} bodyStyle={{paddingBottom: 80,}}
            extra={
            <Space>
                <Button onClick={()=>SetVerInfoData(false)}>Cancelar</Button>
            </Space>}>
            <InfoData DATA={DATA} />
        </Drawer>
      </div>
      );
  }
};

export default Tabla;