import { Button, Result } from 'antd';
import React from 'react';
const Error404: React.FC = () => {
  function IrRuta() {
    window.location.href = "/";
  }
  return (
    <Result
    status="404"
    title="NITABARA"
    subTitle="Url no encontrada, NITABARA."
    extra={<Button type="primary" onClick={()=>IrRuta()}>WEB NITABARA</Button>}
  />
  );
};
export default Error404;
  