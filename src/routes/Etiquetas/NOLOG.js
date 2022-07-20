import { Button, Result } from 'antd';
import React from 'react';

function NOLOG(props) {
    function IrRuta() {
        window.location.href = "/";
    }
    return(
        <Result status="403" title="NITABARA" subTitle="No has iniciado Session.." extra={<Button type="primary" onClick={()=>IrRuta()}>Login</Button>} />
    );
}
export default NOLOG;