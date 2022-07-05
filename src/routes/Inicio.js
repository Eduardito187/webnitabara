import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Roles from './Etiquetas/Roles';


const { Header, Sider, Content } = Layout;

const Inicio: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  function CerrarSession() {
    localStorage.removeItem('ID_USER');
    navigate("/");
  }
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              Mi Perfil
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              Ajustes
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a href="#" rel="noopener noreferrer" onClick={()=>CerrarSession()}>
              Cerrar Session
            </a>
          ),
        },
      ]}
    />
  );
  if (localStorage.ID_USER==null) {
    navigate("/");
    return (
      <div>
        <h1>No has iniciado Session.</h1>
        <a href='/'>Login</a>
      </div>
    );
  }else{
    return (
      <div style={{width:'100%',height:'100%'}}>
        <Layout style={{width:'100%',height:'100%'}}>
          <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" style={{width:'100%',height:'auto',paddingTop:'25px',paddingBottom:'25px'}}>
              <img src="./dist/logo.png" style={{width:'80px',height:'80px',borderRadius:'40px'}} alt="" />
            </div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              style={{height:'100vh'}}
              items={[
                {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'nav 1',
                },
                {
                  key: '2',
                  icon: <VideoCameraOutlined />,
                  label: 'nav 2',
                },
                {
                  key: '3',
                  icon: <UploadOutlined />,
                  label: 'nav 3',
                },
              ]}
            />
          </Sider>
          <Layout className="site-layout">
          <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
            <div style={{width:'60px',justifyContent:'center',textAlign:'center',fontWeight:'bold',color:'purple',fontSize:'20px'}}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>
            <div style={{width:'250px',justifyContent:'center',textAlign:'center',fontWeight:'bold',color:'purple',fontSize:'20px',float:'right'}}>
              <Dropdown overlay={menu} placement="bottomRight">
                <Button>bottomRight</Button>
              </Dropdown>
            </div>
          </Menu>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
              }}
            >
              <Roles />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
};
export default Inicio;
