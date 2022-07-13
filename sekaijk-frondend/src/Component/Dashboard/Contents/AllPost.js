import React, { useState } from "react";
import 'antd';
import './Allpost.css'
import { List, Space, Avatar, Button, Divider, PageHeader, Input, Row, Col } from "antd";
import { EditFilled, DeleteFilled, PlusOutlined, UploadOutlined, FileTextFilled, MenuUnfoldOutlined, MenuFoldOutlined, FileImageFilled, PlusCircleFilled } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";

const data = Array.from({
    length: 15,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));


export default function () {

    const navigate = useNavigate()

    return (
        <div style={{ maxHeight: '90%', overflow: 'auto' }}>
            <div className="container-post">
                <Row>
                    <Col span={10}>
                        <Space>
                            <Input.Search style={{ width: '300px' }} placeholder="Buscar publicacion" onSearch={(e) => console.log(e)} enterButton allowClear />
                        </Space>
                    </Col>
                    <Col span={2} offset={12}>
                        <Space align="end">
                            <Button type="primary" onClick={() => navigate('make')}>
                                <PlusOutlined />
                                Agregar
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Divider />
                <List itemLayout="vertical" size="large" pagination={{
                    onChange: (page) => {
                        console.log(page);
                    }, pageSize: 5,
                }} dataSource={data} footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                } renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <Space>
                                <EditFilled />
                                Editar
                            </Space>,
                            <Space>
                                <DeleteFilled />
                                Eliminar
                            </Space>
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
                />
            </div>
        </div>
    )
}