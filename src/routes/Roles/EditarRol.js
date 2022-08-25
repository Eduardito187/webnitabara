import {MenuFoldOutlined} from '@ant-design/icons';
import { Button, Input, Avatar,Layout, Form, Transfer, Row, Col } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {PermisosAll,EditarRolAPI,GetRolID} from './../../query/consultas';
import MenuAside from '../Etiquetas/MenuAside';
import NavMenu from '../Etiquetas/NavMenu';
import Cargando from '../Etiquetas/Cargando';
import NOLOG from '../Etiquetas/NOLOG';
import { useParams } from 'react-router';
import {NotificacionNitabara} from "./../Etiquetas/Notificar";
const { Header, Sider, Content } = Layout;
  
const EditarRol: React.FC = () => {
    const { ID } = useParams();
    const [NameText,SetNameText] = React.useState("");
    const [Cargado,SetCargado] = React.useState(false);
    const [PermisosAPI,SetPermisosAPI] = React.useState([]);
    const [RolesAPI,SetRolesAPI] = React.useState([]);
    const [GetPermisosAPI, { loading:Cargando_API, error:Error_API, data:Data_API }] = useLazyQuery(PermisosAll, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            if (result.Permisos!=null) {
                SetPermisosAPI(result.Permisos);
                GerRolIDAPI();
            }
        },
      });
    const [GerRolIDAPI, { loading:Cargando_Permisos, error:Error_Permisos, data:Data_Permisos }] = useLazyQuery(GetRolID, {
        variables:{
            ID:parseInt(ID)
        },
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            if (result.Rol!=null) {
                SetRolesAPI(result.Rol);
                SetNameText(result.Rol.Rol);
                getMock(result.Rol.RolPermiso);
            }
        },
      });
    const [EditRolAPI, { loading:Cargando_ROL, error:Error_ROL, data:Data_ROL }] = useMutation(EditarRolAPI);
    const [mockData, setMockData] = React.useState([]);
    const [targetKeys, setTargetKeys] = React.useState([]);

    const getMock = (r) => {
        const tempTargetKeys = [];
        const tempMockData = [];

        for (let i = 0; i < PermisosAPI.length; i++) {
            const data = {
                key: PermisosAPI[i]["ID"],
                title: PermisosAPI[i]["Codigo"],
                description: PermisosAPI[i]["Nombre"],
                chosen: false,
            };

            if (data.chosen) {
                tempTargetKeys.push(data.key);
            }

            tempMockData.push(data);
            
        }
        for (let i = 0; i < r.length; i++) {
            const data = {
                key: r[i]["Permiso"]["ID"],
                title: r[i]["Permiso"]["Codigo"],
                description: r[i]["Permiso"]["Nombre"],
                chosen: true,
            };

            if (data.chosen) {
                tempTargetKeys.push(data.key);
            }

            tempMockData.push(data);
        }

        setMockData(tempMockData);
        setTargetKeys(tempTargetKeys);
        SetCargado(true);
    };

    React.useEffect(() => {
        GetPermisosAPI();
    }, []);

    const handleChange = (newTargetKeys, direction, moveKeys) => {
        setTargetKeys(newTargetKeys);
    };

    const renderItem = (item) => {
        const customLabel = (
            <span className="custom-item">
                {item.title} - {item.description}
            </span>
        );
        return {
            label: customLabel,
            // for displayed item
            value: item.title, // for title and filter matching
        };
    };

    function cambioTexto(a){
        SetNameText(a.target.value);
    }
    const [collapsed, setCollapsed] = useState(false);

    function RegistrarRol() {
        EditRolAPI({ variables: {
            ID:parseInt(ID),
            Nombre:NameText,
            Permisos:targetKeys
        }}).then(({ data }) => {
            if (data.EditRolesUsers!=null) {
                if (data.EditRolesUsers.response) {
                    NotificacionNitabara('success','NITABARA','Rol editado exitosamente.');
                }else{
                    NotificacionNitabara('error','NITABARA','Error en API.');
                }
            }else{
                NotificacionNitabara('error','NITABARA','Error en API.');
            }
          }).catch(e => {
            NotificacionNitabara('error','NITABARA','Error en API.');
          });
    }
    if (localStorage.ID_USER==null) {
      return <NOLOG />;
    }else if (Cargado==true){
      return (
        <Layout style={{width:'100%',height:'100%'}}>
            <MenuAside collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavMenu setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="site-layout-background" style={{margin: '24px 16px',padding: 24,}}>
                    <Row>
                        <Col span={12}>
                            <Form name="basic" labelCol={{span: 6}} wrapperCol={{span: 18}} style={{textAlign:'left'}} initialValues={{remember: true}} autoComplete="off" initialValues={{ Nombre : NameText}} >
                                <Form.Item name="Nombre" label="Nombre" >
                                    <Input placeholder="Nombre Rol" onChange={(a)=>cambioTexto(a)} />
                                </Form.Item>
                                <Form.Item name="Permisos" label="Permisos" >
                                    <Transfer showSearch dataSource={mockData} listStyle={{width: 300,height: 300,textAlign:'left'}} targetKeys={targetKeys} onChange={handleChange} render={renderItem} />
                                </Form.Item>
                            </Form>
                            {
                                NameText.length>3
                                ? (
                                    <Form.Item wrapperCol={{offset: 0,span: 0}} >
                                        <Button type="primary" onClick={()=>RegistrarRol()}>
                                            Editar Rol
                                        </Button>
                                    </Form.Item>
                                )
                                : null
                            }
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
      );
    }else{
        return <Cargando />;
    }
  };
  export default EditarRol;
  