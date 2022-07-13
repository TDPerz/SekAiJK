import { Button, Col, Divider, Input, Row, Select, Space, Switch, Upload } from "antd";
import { EyeFilled, EyeInvisibleFilled, SaveFilled, UploadOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react"
import parseHtml from "html-react-parser"

export default function CreatePost() {

    const [desc, setDesc] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [preview, setPreview] = useState(false);

    return (
        <div>
            <div style={{ marginLeft: '15px', marginRight: '15px', marginTop: '25px' }}>
                <Row>
                    <Col span={20}>
                        <Input style={{ fontSize: '24px' }} placeholder="Titulo de la Publicacion" bordered={false} size="large" />
                    </Col>
                    <Col span={4} >
                        <Space align="center" style={{ width: '100%', height: '100%' }}>
                            <Select defaultValue={0} onChange={() => { }} style={{ width: '100%' }}>
                                <Select.Option value={0}>
                                    <Space>
                                        <EyeInvisibleFilled />
                                        <span>Privado</span>
                                    </Space>
                                </Select.Option>
                                <Select.Option value={1}>
                                    <Space>
                                        <EyeFilled />
                                        <span>Publico</span>
                                    </Space>
                                </Select.Option>
                            </Select>
                            <Button type="primary">
                                <Space>
                                    <SaveFilled />
                                    <span>Guardar</span>
                                </Space>
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </div>
            <div className="container-post">
                <Divider />
                <div>
                    <label form="description">Descripcion</label>
                    <Input.TextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <h3>
                    Fondo:
                </h3>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    onChange={(e)=>{
                        console.log(e.file.status)
                        var file = e.file
                        var reader = new FileReader();
                        reader.onload = (e)=>{
                            console.log(e.target.result)
                            setImageUrl(e.target.result)
                        }
                        reader.error = ()=>{
                            console.log("Salio un error")
                        }
                        console.log("Iniciando...")
                        reader.readAsDataURL(file);
                        console.log("Finalizado")
                    }}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                                width: '100%',
                            }}
                        />
                    ) : (

                        <div>
                            {loading ? <LoadingOutlined /> : <PlusOutlined />}
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    )}
                </Upload>
            </div>
            <Divider />
            <div className="container-post">
                <Switch style={{ marginBottom: '20px' }} va checkedChildren="Preview" unCheckedChildren="Editor" onChange={(check) => { setPreview(check) }} />
                <div>
                    {preview ?
                        parseHtml(body)
                        :
                        <CKEditor initData={body} onChange={(e) => setBody(e.editor.getData())} />
                    }
                </div>
            </div>
        </div>
    )
}