import React, { useEffect, useState } from 'react';
import './../../css/Validar.css';
import { useMutation,useLazyQuery } from '@apollo/client';
import {MiName,IrUrlNitabara, MiFoto} from '../../query/consultas';
import { Avatar, Dropdown, Menu,Layout } from 'antd';
import { UserOutlined,MenuFoldOutlined,MenuUnfoldOutlined } from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
var CryptoJS = require("crypto-js");

function NavMenu(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [UserName,SetUserName] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const [GetPerfil, { loading:Cargando_Data, error:Error_Data, data:Data }] = useLazyQuery(MiFoto);
    const [GetName, { loading:Cargando_Name, error:Error_Name, data:Data_Name }] = useLazyQuery(MiName, {
        variables:{
            ID: parseInt(localStorage.ID_USER)
        },
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            SetUserName(result);
        },
    });
    useEffect(() => {
        GetName();
        GetPerfil({ variables: {ID:parseInt(localStorage.ID_USER)}}).then(({ data }) => {
            if (data.Usuario!=null) {
              if (data.Usuario.Perfil != null) {
                setImageUrl(data.Usuario.Perfil.URLPublica);
              }
            }
          })
          .catch(e => {
            //
          });
    }, []);
    function CerrarSession() {
      localStorage.removeItem('ID_USER');
      localStorage.removeItem('ID_ROL_ACTUAL');
      localStorage.removeItem('NAME_ROL_ACTUAL');
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
            <div style={{width:'400px',fontWeight:'bold',color:'purple',fontSize:'20px',position:'absolute',zIndex:100,right:'0px'}}>
                <Dropdown overlay={menu} placement="bottomRight">
                    <span class="pointer">
                    <Avatar src={imageUrl} size="large" icon={<UserOutlined />} /><b class="pointer"> {
                        UserName != null
                        ? <b>{UserName.Usuario.Persona.Nombre+" "+UserName.Usuario.Persona.Paterno+" "+UserName.Usuario.Persona.Materno}</b>
                        : null
                    }</b>
                    </span>
                </Dropdown>
            </div>
        </Menu>
    );
}
export default NavMenu;