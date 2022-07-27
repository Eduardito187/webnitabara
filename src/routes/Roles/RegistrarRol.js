import {MenuFoldOutlined} from '@ant-design/icons';
import { Button, Input, Avatar,Layout, Form, Transfer, Row, Col } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {PermisosAll,CrearNewRol} from './../../query/consultas';
import MenuAside from '../Etiquetas/MenuAside';
import NavMenu from '../Etiquetas/NavMenu';
import PanelNita from '../Etiquetas/PanelNita';
import TablaRoles from '../Etiquetas/TablaRoles';
import NOLOG from '../Etiquetas/NOLOG';
import {NotificacionNitabara} from "./../Etiquetas/Notificar";
const { Header, Sider, Content } = Layout;
  
const RegistrarRol: React.FC = () => {
    const [NameText,SetNameText] = React.useState("");
    const [GetPermisosAPI, { loading:Cargando_Permisos, error:Error_Permisos, data:Data_Permisos }] = useLazyQuery(PermisosAll, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            getMock(result);
        },
      });
    const [NewRolAPI, { loading:Cargando_ROL, error:Error_ROL, data:Data_ROL }] = useMutation(CrearNewRol);
    const [mockData, setMockData] = React.useState([]);
    const [targetKeys, setTargetKeys] = React.useState([]);

    const getMock = (r) => {
        const tempTargetKeys = [];
        const tempMockData = [];

        for (let i = 0; i < r.Permisos.length; i++) {
            const data = {
                key: r.Permisos[i]["ID"],
                title: r.Permisos[i]["Codigo"],
                description: r.Permisos[i]["Nombre"],
                chosen: false,
            };

            if (data.chosen) {
                tempTargetKeys.push(data.key);
            }

            tempMockData.push(data);
        }

        setMockData(tempMockData);
        setTargetKeys(tempTargetKeys);
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
        NewRolAPI({ variables: {
            Nombre:NameText,
            Permisos:targetKeys
        }}).then(({ data }) => {
            if (data.CreateRol!=null) {
                if (data.CreateRol.response) {
                    NotificacionNitabara('success','NITABARA','Rol registrado exitosamente.');
                    SetNameText("");
                    setTargetKeys([]);
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
    }else{
      return (
        <Layout style={{width:'100%',height:'100%'}}>
            <MenuAside collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavMenu setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="site-layout-background" style={{margin: '24px 16px',padding: 24,}}>
                    <Row>
                        <Col span={12}>
                            <Form.Item name="Nombre" label="Nombre" >
                                <Input placeholder="Nombre Rol" onChange={(a)=>cambioTexto(a)} />
                            </Form.Item>
                            <Form.Item name="Permisos" label="Permisos" >
                                <Transfer showSearch dataSource={mockData} listStyle={{width: 300,height: 300,textAlign:'left'}} targetKeys={targetKeys} onChange={handleChange} render={renderItem} />
                            </Form.Item>
                            {
                                NameText.length>3
                                ? (
                                    <Form.Item wrapperCol={{offset: 0,span: 0}} >
                                        <Button type="primary" onClick={()=>RegistrarRol()}>
                                            Registrar Rol
                                        </Button>
                                    </Form.Item>
                                )
                                : null
                            }
                        </Col>
                    </Row>
                    <b>{targetKeys.map((i)=>(
                        <h1>{i}</h1>
                    ))}</b>
                </Content>
            </Layout>
        </Layout>
      );
    }
  };
  export default RegistrarRol;
  