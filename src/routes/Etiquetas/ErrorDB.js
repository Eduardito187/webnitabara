import { Button, Result } from 'antd';
import React from 'react';

const ErrorDB = () => (
  <Result status="ERROR DB" title="ERROR DB" subTitle="Ocurrio algo en la API." />
);

export default ErrorDB;