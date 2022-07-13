import 'antd'
import './Authentic.css'
import Logo from '../../assets/Logos.png'
import backgroun from '../../assets/WebLogin.jpg'
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import authenticate from '../../Api/authenticate';
import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { DataWebContext } from '../Context/DataWebProvaider';
import 'react-dom';
import { useNavigate } from 'react-router-dom';

export default function Authentic() {

    const [loginForm] = Form.useForm()
    const context = useContext(DataWebContext)
    const valiMS = {}
    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState([])

    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        authenticate.login(values).then(({ data }) => {
            if (data.Status == 0) {
                context.setToken(values.remember, data.Token)
                navigate('/admin/dashboard/post')
            }
            else {
                setLoading(false)
                toast.error(data.Mensaje, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='bg-login' style={{ backgroundImage: `url(${backgroun})` }}>
            <div className='login-size'>
                <div style={{ width: '100%' }}>
                    <img src={Logo} className='logo' />
                </div>
                <Form form={loginForm} className="login-form" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                    <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]} hasFeedback validateStatus="">
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]} >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña" />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox style={{ color: 'white' }}>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        <Button className='bt-size' type="primary" htmlType="submit" disabled={loginError.length || loading} loading={loading}>
                            Iniciar seccion
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <ToastContainer />
        </div>
    )
}