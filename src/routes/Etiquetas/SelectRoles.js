import { Button, Card, Transfer, Row,Col } from 'antd';
import * as React from 'react';
import { useMutation,useLazyQuery } from '@apollo/client';
import {BloquearUserAPI,GetStateUser,SoloRoles,RolesUsers,AsignadoDeRoles} from "../../query/consultas";
import Cargando from './Cargando';
import ErrorNULL from './ErrorNULL';
import {NotificacionNitabara} from "./Notificar";
const SelectRoles = (props) => {
    const [load,Setload] = React.useState(true);
    const [RolesData,SetRolesData] = React.useState([]);
    const [DataUsuario,SetDataUsuario] = React.useState(null);
    const [SetAsignadoDeRoles, { loading:Cargando_SetRol, error:Error_SetRol, data:Data_SetRol }] = useMutation(AsignadoDeRoles);
    const [GetSoloRoles, { loading:Cargando_SoloRoles, error:Error_SoloRoles, data:Data_SoloRoles }] = useLazyQuery(SoloRoles, {
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            if (result.Roles!=null) {
                SetRolesData(result.Roles);
                GetRolesUsers();
            }
        },
      });
    const [GetRolesUsers, { loading:Cargando_RolesUsers, error:Error_RolesUsers, data:Data_RolesUsers }] = useLazyQuery(RolesUsers, {
        variables:{
            ID:parseInt(props.ID)
        },
        fetchPolicy: 'no-cache',
        onCompleted: result => {
            if (result.Usuario!=null) {
                SetDataUsuario(result.Usuario);
                Setload(false);
                getMock(result.Usuario.Roles);
            }else{
                SetDataUsuario("No Data");
            }
        },
      });
    
    const [mockData, setMockData] = React.useState([]);
    const [targetKeys, setTargetKeys] = React.useState([]);

    const getMock = (r) => {
        const tempTargetKeys = [];
        const tempMockData = [];

        for (let i = 0; i < RolesData.length; i++) {
            const data = {
                key: RolesData[i]["ID"],
                title: RolesData[i]["Rol"],
                description: RolesData[i]["Rol"],
                chosen: false,
            };

            if (data.chosen) {
                tempTargetKeys.push(data.key);
            }

            tempMockData.push(data);
            
        }
        for (let i = 0; i < r.length; i++) {
            console.log(r[i]); 
            const data = {
                key: r[i]["Rol"]["ID"],
                title: r[i]["Rol"]["Rol"],
                description: r[i]["Rol"]["Rol"],
                chosen: true,
            };

            if (data.chosen) {
                tempTargetKeys.push(data.key);
            }

            tempMockData.push(data);
        }

        setMockData(tempMockData);
        setTargetKeys(tempTargetKeys);
    };
    const handleChange = (newTargetKeys, direction, moveKeys) => {
        setTargetKeys(newTargetKeys);
    };

    const renderItem = (item) => {
        const customLabel = (
            <span className="custom-item">
                {item.key} - {item.title}
            </span>
        );
        return {
            label: customLabel,
            // for displayed item
            value: item.title, // for title and filter matching
        };
    };

    React.useEffect(() => {
        GetSoloRoles();
    },[]);

    function AsignadoDeRolesWEB(){
        SetAsignadoDeRoles({ variables: {
            ID:parseInt(props.ID),
            Roles:targetKeys
        }}).then(({ data }) => {
            if (data.AsignadoDeRoles!=null) {
                if (data.AsignadoDeRoles.response) {
                    NotificacionNitabara('success','NITABARA','Roles asignados exitosamente.');
                }else{
                    NotificacionNitabara('error','NITABARA','Error en API.');
                }
            }else{
                NotificacionNitabara('error','NITABARA','Error en API.');
            }
          }).catch(e => {
            NotificacionNitabara('error','NITABARA','Error en API.');
          });
    }
    if (DataUsuario=="No Data") {
        return <ErrorNULL />;
    }else if (DataUsuario!=null) {
        return (
            <Card title="Seleccion de permisos" bordered={true} style={{width:'100%'}}>
                <Transfer showSearch dataSource={mockData} listStyle={{width: '100%',height: 300,textAlign:'left'}} targetKeys={targetKeys} onChange={handleChange} render={renderItem} />
                <Row style={{marginTop:'20px',textAlign:'left'}}>
                    <Col span={24}>
                        <Button type="primary" onClick={()=>AsignadoDeRolesWEB()}>Actualizar roles</Button>
                    </Col>
                </Row>
            </Card>
        );
    }else{
        return <Cargando />;
    }
};

export default SelectRoles;