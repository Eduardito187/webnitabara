import {MenuFoldOutlined} from '@ant-design/icons';
import { Button, Dropdown, Avatar,Layout, Menu, Transfer } from 'antd';
import React, { useState } from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import {PermisosAll} from './../../query/consultas';
import MenuAside from '../Etiquetas/MenuAside';
import NavMenu from '../Etiquetas/NavMenu';
import PanelNita from '../Etiquetas/PanelNita';
import TablaRoles from '../Etiquetas/TablaRoles';
import NOLOG from '../Etiquetas/NOLOG';
const { Header, Sider, Content } = Layout;
  
const RegistrarRol: React.FC = () => {

    const [GetPermisosAPI, { loading:Cargando_Permisos, error:Error_Permisos, data:Data_Permisos }] = useLazyQuery(PermisosAll, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            getMock(result);
        },
      });
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
        console.log(newTargetKeys, direction, moveKeys);
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

    const [collapsed, setCollapsed] = useState(false);
    if (localStorage.ID_USER==null) {
      return <NOLOG />;
    }else{
      return (
        <Layout style={{width:'100%',height:'100%'}}>
            <MenuAside collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavMenu setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="site-layout-background" style={{margin: '24px 16px',padding: 24,}}>
                    <Transfer showSearch dataSource={mockData} listStyle={{width: 300,height: 300,textAlign:'left'}} targetKeys={targetKeys} onChange={handleChange} render={renderItem} />
                </Content>
            </Layout>
        </Layout>
      );
    }
  };
  export default RegistrarRol;
  