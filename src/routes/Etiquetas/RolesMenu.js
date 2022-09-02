import * as React from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {Consulta_Cuenta_Roles,GetStateUser} from "../../query/consultas";
import './../../css/Validar.css';
import Cargando from './Cargando';
import ErrorNULL from './ErrorNULL';
import { DownOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import { Menu,Dropdown,Space,Row,Col } from 'antd';
import {NotificacionNitabara} from "./Notificar";
const RolesMenu = (props) => {
    const [UsuarioData,SetUsuarioData] = React.useState(null);
    const [RolesComponent,SetRolesComponent] = React.useState([]);
    const [RolSelectActual,SetRolSelectActual] = React.useState("");
    const [getData, { loading, error, data }] = useLazyQuery(Consulta_Cuenta_Roles, {
      variables:{
        ID:parseInt(localStorage.ID_USER)
      },
      fetchPolicy: 'no-cache',
      onCompleted: result => {
        if (result.Usuario!=null) {
          SetUsuarioData(result.Usuario);
          ArmadoMenuRoles(result.Usuario.Roles);
        }else{
          SetUsuarioData("No Data");
        }
      },
    });

    React.useEffect(() => {
      getData();
    },[]);
  function ArmadoMenuRoles(obj) {
    let x = [];
    for (let index = 0; index < obj.length; index++) {
      x.push({
        label: (
          <b onClick={()=>SelectRol(obj[index]["Rol"])}>
          {obj[index]["Rol"]["Rol"]}
          </b>
          ),
        key: obj[index]["Rol"]["ID"]+"_ID_ROL",
      });
    }
    if (localStorage.ID_ROL_ACTUAL==null) {
      localStorage.ID_ROL_ACTUAL=obj[0]["Rol"]["ID"];
      localStorage.NAME_ROL_ACTUAL=obj[0]["Rol"]["Rol"];
    }
    SetRolSelectActual(localStorage.NAME_ROL_ACTUAL);
    SetRolesComponent(x);
  }
  function SelectRol(Rol) {
    SetRolSelectActual(Rol.Rol);
    localStorage.ID_ROL_ACTUAL=Rol.ID;
    localStorage.NAME_ROL_ACTUAL=Rol.Rol;
    window.location.reload();
  }
  function retornarTEXTO(a) {
    if (props.collapsed) {
      return "Roles";
    }else{
      return a;
    }
  }
    if (UsuarioData=="No Data") {
        return <ErrorNULL />;
    }else if (UsuarioData!=null) {
        return (
          <Row>
            <Col span={24}>
                <Dropdown overlay={<Menu items={RolesComponent} />} trigger={['click']}>
                  <b onClick={(e) => e.preventDefault()}>
                    <Space>
                      {retornarTEXTO(RolSelectActual)}
                      <DownOutlined />
                    </Space>
                  </b>
                </Dropdown>
            </Col>
          </Row>
        );
    }else{
      return <Cargando />;
    }
};

export default RolesMenu;