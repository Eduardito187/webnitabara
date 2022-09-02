import React, { useState } from 'react';
import {EditOutlined,EyeOutlined} from '@ant-design/icons';
import { useMutation,useLazyQuery } from '@apollo/client';
import { ValidarPermisoRango } from '../../query/consultas';

const MarcoRol = (props) => {
    const [ getDataPermiso, { loading, error, data } ] = useLazyQuery(ValidarPermisoRango);
    const [Validacion,SetValidacion] = React.useState(false);
    React.useEffect(() => {
        getDataPermiso({
            variables: {
                ID: parseInt(localStorage.ID_USER),
                Codigo: props.Codigo,
                Rol: parseInt(localStorage.ID_ROL_ACTUAL)
            },
            fetchPolicy: 'no-cache'
        }).then(({ data }) => {
            if (data.ValidarPermisoRango!=null) {
                SetValidacion(data.ValidarPermisoRango.response);
            }else{
                SetValidacion(false);
            }
        })
    }, []);

    if (Validacion === false) {
        return null;
    }else {
        return props.Componente;
    }
};

export default MarcoRol;