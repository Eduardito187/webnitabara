import { Button, Dropdown, Avatar,Layout, Menu } from 'antd';
import { PDFViewer } from '@react-pdf/renderer';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Roles from '../Etiquetas/Roles';
import RolesMenu from '../Etiquetas/RolesMenu';
import MenuAside from '../Etiquetas/MenuAside';
import NavMenu from '../Etiquetas/NavMenu';
import Tabla from './Componentes/Tabla';
import NOLOG from '../Etiquetas/NOLOG';
import DoomPDF from '../Etiquetas/DoomPDF';
import DoomEXCEL from '../Etiquetas/DoomEXCEL';
/*

<RolesMenu key={'role'} />
<Roles />
*/

const { Header, Sider, Content } = Layout;
const Laboratorios: React.FC = () => {
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
                        <Tabla />
                        <PDFViewer>
                            <DoomPDF />
                        </PDFViewer>
                        <DoomEXCEL filename="requests.xlsx" worksheets={[
                            {
                            name: "Requests",
                            columns: [
                                { label: "Full Name", value: "name" },
                                { label: "Email", value: "email" },
                                { label: "Template", value: "template" }
                            ],
                            data: [
                                {
                                name: "Bob Ross",
                                email: "boss_ross@gmail.com",
                                template: "Accounts Receivables"
                                }
                            ]
                            }
                        ]} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
  };
  export default Laboratorios;
  