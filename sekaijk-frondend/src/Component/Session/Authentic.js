import 'antd'
import './Authentic.css'
import Logo from '../../assets/Logo4.png'
import backgroun from '../../assets/WebLogin.jpg'
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import authenticate from '../../Api/authenticate';
import { useContext } from 'react';
import { DataWebContext } from '../Context/DataWebProvaider';
import 'react-dom';
import { useNavigate } from 'react-router-dom';

export default function Authentic() {

    const [loginForm] = Form.useForm()
    const context = useContext(DataWebContext)
    const valiMS = {}

    const navigate = useNavigate()

    const onFinish = async (values) => {
        authenticate.login(values).then( ({data}) => {
            if(data.Status == 0){
                context.setToken(values.remember, data.Token)
                navigate('/admin/dashboard/post')
            }
            else{
                Modal.error({
                    content:data.Mensaje
                })
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='bg-login' style={{ backgroundImage: `url(${backgroun})` }}>
            <div className='login-size'>
                <div style={{width:'100%'}}>
                    <img src={Logo} className='logo' />
                </div>
                <Form form={loginForm} className="login-form" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button className='bt-size' type="primary" htmlType="submit" disabled={!!loginForm.getFieldsError().filter(({ errors }) => errors.length).length} >
                                Iniciar seccion
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}