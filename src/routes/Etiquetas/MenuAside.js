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
                <img src="https://image.shutterstock.com/image-vector/img-file-document-icon-260nw-1356823577.jpg" style={{width:'80px',height:'80px',borderRadius:'40px'}} alt="" />
                <RolesMenu collapsed={props.collapsed} />
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
                <Menu.Item key={'Clientes'} onClick={()=>IrUrlNitabara("/Clientes")}>
                    <UserOutlined size={"small"} /> <b>{retornarTEXTO('Clientes')}</b>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default MenuAside;