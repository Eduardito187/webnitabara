import { Button, Dropdown, Avatar,Layout, Menu } from 'antd';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Roles from '../Etiquetas/Roles';
import RolesMenu from '../Etiquetas/RolesMenu';
import MenuAside from '../Etiquetas/MenuAside';
import NavMenu from '../Etiquetas/NavMenu';
import PanelNita from '../Etiquetas/PanelNita';
import NOLOG from '../Etiquetas/NOLOG';
/*

<RolesMenu key={'role'} />
<Roles />
*/

const { Header, Sider, Content } = Layout;

const Inicio: React.FC = () => {
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
            <PanelNita />
          </Content>
        </Layout>
      </Layout>
    );
  }
};
export default Inicio;
