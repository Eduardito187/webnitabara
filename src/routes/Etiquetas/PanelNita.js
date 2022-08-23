import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import './../../css/Main.css';
import { IrUrlNitabara } from '../../query/consultas';
import React from 'react';

const PanelNita = () => (
  <div className="site-statistic-demo-card">
    <Row gutter={16}>
        <Col span={6}>
            <div class="ant-card ant-card-bordered SeparacionVertical" onClick={()=>IrUrlNitabara("/Laboratorios")}>
                <div class="ant-card-body">
                    <div class="ant-statistic">
                        <Statistic title="Laboratorios" value={112893} />
                    </div>
                </div>
            </div>
        </Col>
        <Col span={6}>
            <div class="ant-card ant-card-bordered SeparacionVertical" onClick={()=>IrUrlNitabara("/Consultas")}>
                <div class="ant-card-body">
                    <div class="ant-statistic">
                        <Statistic title="Consultas" value={93} />
                    </div>
                </div>
            </div>
        </Col>
        <Col span={6}>
            <div class="ant-card ant-card-bordered SeparacionVertical" onClick={()=>IrUrlNitabara("/Cirugias")}>
                <div class="ant-card-body">
                    <div class="ant-statistic">
                        <Statistic title="Cirugias" value={93} />
                    </div>
                </div>
            </div>
        </Col>
    </Row>
  </div>
);

export default PanelNita;