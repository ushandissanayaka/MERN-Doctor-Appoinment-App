import React from 'react';
import '../styles/RegisterStyles.css';
import { Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { showLoading , hideLoading } from "../redux/features/alertSlice"

const Register = () => {
    const navigate = useNavigate();
 const dispatch = useDispatch()
    // form handler
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading())
            if (res.data.success) {
                message.success('Registered successfully!');
                navigate('/login');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('Something went wrong');
        }
    };

    
    return (
        <div className='form-container'>

            <div className='form-container-box'>
            <Form layout='vertical' onFinish={onFinishHandler} className="register-form">
                <h3 className='text-center '>Register Form</h3>

                <Form.Item label="Name" name="name">
                    <Input type="text" required />
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>

                <Link to="/login" className='m-2'>Already a user? Login here</Link>

                <button className='btn btn-primary' type='submit'>Register</button>
            </Form>
            </div>
        </div>
    );
};

export default Register;
