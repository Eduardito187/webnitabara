import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation,useLazyQuery } from '@apollo/client';
import { Button, Row, Col, Layout, Drawer, message, Upload } from 'antd';
import { MiFoto } from '../../query/consultas';
import React, { useState } from 'react';
import MenuAside from '../Etiquetas/MenuAside';
import NavMenu from '../Etiquetas/NavMenu';
import NOLOG from '../Etiquetas/NOLOG';
import { useParams } from 'react-router';
import EditarPerfil from '../Etiquetas/EditarPerfil';
const { Header, Sider, Content } = Layout;


const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
      message.error('Formato invalido solo se aceptan JPG/PNG!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
      message.error('La imagen pesa mas de 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

const MiPerfil: React.FC = (props) => {
  const [GetPerfil, { loading:Cargando_Data, error:Error_Data, data:Data }] = useLazyQuery(MiFoto);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState();

  const [collapsed, setCollapsed] = useState(false);

  React.useEffect(() => {
    GetPerfil({ variables: {ID:parseInt(localStorage.ID_USER)}}).then(({ data }) => {
        if (data.Usuario!=null) {
          if (data.Usuario.Perfil != null) {
            console.log(data.Usuario.Perfil.URLPublica);
            setImageUrl(data.Usuario.Perfil.URLPublica);
          }
        }
      })
      .catch(e => {
        //
      });
  },[]);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
        setLoading(true);
        return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
    }

    if (info.file.status === 'error') {
        alert("Error al subir.");
        setLoading(false);
        return;
    }
  };
  const uploadButton = (
      <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{marginTop: 8}}>
              <b>Subir</b>
          </div>
      </div>
  );

    if (localStorage.ID_USER==null) {
      return <NOLOG />;
    }else{
      return (
        <Layout style={{width:'100%',height:'100%'}}>
            <MenuAside collapsed={collapsed}/>
            <Layout className="site-layout">
                <NavMenu setCollapsed={setCollapsed} collapsed={collapsed} />
                <Content className="site-layout-background" style={{margin: '24px 16px',padding: 24,}}>
                    <Row>
                      <Col span={24}>
                        <Upload name="file" listType="picture-card" className="avatar-uploader" showUploadList={false} action={"hhttp://nitabara.grazcompany.com/upload.php?ID="+localStorage.ID_USER} beforeUpload={beforeUpload} onChange={handleChange} >
                          {imageUrl ? (
                            <img src={imageUrl} alt="avatar" style={{width: '100%'}}/>
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </Col>
                      <Col span={24}>
                          <div style={{padding:'5px'}}>
                              <EditarPerfil ID={localStorage.ID_USER} />
                          </div>
                      </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
      );
    }
};
export default MiPerfil;
  