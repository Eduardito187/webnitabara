import React, { useEffect, useState } from 'react';
import './../../css/Validar.css';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Consulta_Cuenta} from '../../query/consultas';
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
    function IrRuta(a) {
        window.location.href = a;
    }
    return(
        <Sider theme="light" trigger={null} collapsible collapsed={props.collapsed} style={{height:'100vh'}}>
            <div className="logo" style={{width:'100%',height:'auto',paddingTop:'25px',paddingBottom:'25px'}}>
                <img src="./dist/logo.png" style={{width:'80px',height:'80px',borderRadius:'40px'}} alt="" />
            </div>
            <Menu>
                <Menu.Item onClick={()=>IrRuta("/Inicio")}>
                    <DashboardOutlined size={"small"} /> <b>{retornarTEXTO('Panel NITABARA')}</b>
                </Menu.Item>
                <Menu.Item onClick={()=>IrRuta("/Usuarios")}>
                    <UserOutlined size={"small"} /> <b>{retornarTEXTO('Usuarios')}</b>
                </Menu.Item>
                <Menu.Item onClick={()=>IrRuta("/Roles")}>
                    <SecurityScanOutlined size={"small"} /> <b>{retornarTEXTO('Roles')}</b>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}
export default MenuAside;