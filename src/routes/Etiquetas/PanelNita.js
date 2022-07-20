import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

const PanelNita = () => (
  <div className="site-statistic-demo-card">
    <Row gutter={16}>
        <Col span={6}>
            <Card>
            <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{
                color: '#3f8600',
                }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
            />
            </Card>
        </Col>
        <Col span={6}>
            <Card>
            <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{
                color: '#cf1322',
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
            />
            </Card>
        </Col>
        <Col span={6}>
            <div class="ant-card ant-card-bordered">
                <div class="ant-card-body">
                    <div class="ant-statistic">
                        <Statistic title="Active Users" value={112893} />
                    </div>
                </div>
            </div>
        </Col>
        <Col span={6}>
            <div class="ant-card ant-card-bordered">
                <div class="ant-card-body">
                    <div class="ant-statistic">
                        <Statistic title="Unmerged" value={93} suffix="/ 100" />
                    </div>
                </div>
            </div>
        </Col>
    </Row>
  </div>
);

export default PanelNita;