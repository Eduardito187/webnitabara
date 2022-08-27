import { Row, Col, Button, Dropdown, Avatar,Layout, Menu } from 'antd';
import React, { useState } from 'react';
import MenuAside from '../Etiquetas/MenuAside';
import NavMenu from '../Etiquetas/NavMenu';
import NOLOG from '../Etiquetas/NOLOG';
import { useParams } from 'react-router';
import EditExamen from './Componentes/EditExamen';
const { Header, Sider, Content } = Layout;
  
const EditarLaboratorio: React.FC = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { ID } = useParams();
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
                        <Col span={6}>
                        </Col>
                        <Col span={12}>
                            <div style={{padding:'5px'}}>
                              <EditExamen />
                            </div>
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
      );
    }
};
export default EditarLaboratorio;