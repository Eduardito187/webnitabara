import React, { useEffect, useState } from 'react';
import './../../css/Validar.css';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Consulta_Cuenta,IrUrlNitabara} from '../../query/consultas';
import { Avatar, Dropdown, Menu,Layout } from 'antd';
import { UserOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
var CryptoJS = require("crypto-js");

function NavMenu(props) {
    function CerrarSession() {
      localStorage.removeItem('ID_USER');
      IrUrlNitabara("/");
    }
    const menu = (
        <Menu
            items={[
            {
                key: '1',
                label: (
                <a rel="noopener noreferrer" href="/MiPerfil">
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
    return(
        <Menu mode="horizontal" defaultSelectedKeys={['mail']} style={{position:'relative',height:'55px'}}>
            <div style={{width:'60px',justifyContent:'center',textAlign:'center',fontWeight:'bold',color:'purple',fontSize:'20px'}}>
                {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => props.setCollapsed(!props.collapsed),
                })}
            </div>
            <div style={{width:'300px',fontWeight:'bold',color:'purple',fontSize:'20px',position:'absolute',zIndex:100,right:'0px'}}>
                <Dropdown overlay={menu} placement="bottomRight">
                    <span class="pointer">
                    <Avatar size="large" icon={<UserOutlined />} /><b class="pointer"> Oliver Mauricio Oliva</b>
                    </span>
                </Dropdown>
            </div>
        </Menu>
    );
}
export default NavMenu;