import React, { useEffect, useState } from 'react';
import './../../css/Validar.css';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Consulta_Cuenta,IrUrlNitabara} from '../../query/consultas';
import RolesMenu from './RolesMenu';
import {useNavigate} from 'react-router-dom';
import { Button, Dropdown, Menu,Layout } from 'antd';
import { SecurityScanOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
var CryptoJS = require("crypto-js");
function MenuAside(props) {
    function retornarTEXTO(a) {
        if (props.collapsed) {
            return "";
        }else{
            return a;
        }
    }
    return(
        <Sider theme="light" trigger={null} collapsible collapsed={props.collapsed} style={{height:'100vh'}}>
            <div className="logo" style={{width:'100%',height:'auto',paddingTop:'25px',paddingBottom:'25px'}}>
                <img src="https://scontent.fsrz1-2.fna.fbcdn.net/v/t1.6435-9/78754959_111776756968296_5360999924286619648_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=973b4a&_nc_ohc=su3qdpaJ-KEAX-TM_Uj&_nc_ht=scontent.fsrz1-2.fna&oh=00_AT_hP1sbSGKNZp_Mg2YZYme47-YNHteALLcFgmJI09lNPQ&oe=630D8A9B" style={{width:'80px',height:'80px',borderRadius:'40px'}} alt="" />
                <RolesMenu />
            </div>
            <Menu>
                <Menu.Item key={'PANEL_NITA'} onClick={()=>IrUrlNitabara("/Inicio")}>
                    <DashboardOutlined size={"small"} /> <b>{retornarTEXTO('Panel NITABARA')}</b>
                </Menu.Item>
                <Menu.Item key={'Usuarios'} onClick={()=>IrUrlNitabara("/Usuarios")}>
                    <UserOutlined size={"small"} /> <b>{retornarTEXTO('Usuarios')}</b>
                </Menu.Item>
                <Menu.Item key={'Roles'} onClick={()=>IrUrlNitabara("/Roles")}>
                    <SecurityScanOutlined size={"small"} /> <b>{retornarTEXTO('Roles')}</b>
                </Menu.Item>
                <Menu.Item key={'Cirugias'} onClick={()=>IrUrlNitabara("/Cirugias")}>
                    <SecurityScanOutlined size={"small"} /> <b>{retornarTEXTO('Cirugias')}</b>
                </Menu.Item>
                <Menu.Item key={'Consultas'} onClick={()=>IrUrlNitabara("/Consultas")}>
                    <SecurityScanOutlined size={"small"} /> <b>{retornarTEXTO('Consultas')}</b>
                </Menu.Item>
                <Menu.Item key={'Laboratorios'} onClick={()=>IrUrlNitabara("/Laboratorios")}>
                    <SecurityScanOutlined size={"small"} /> <b>{retornarTEXTO('Laboratorios')}</b>
                </Menu.Item>
                <Menu.Item key={'Laboratorios'} onClick={()=>IrUrlNitabara("/Clientes")}>
                    <UserOutlined size={"small"} /> <b>{retornarTEXTO('Clientes')}</b>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default MenuAside;