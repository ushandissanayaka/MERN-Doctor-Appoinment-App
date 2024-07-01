import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import moment from 'moment';

const Profile = () => {
    const { user } = useSelector(state => state.user);
    const [doctor, setDoctor] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    // Handle form submission
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/doctor/updateProfile',
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        moment(values.timings[0]).format("HH:mm"),
                        moment(values.timings[1]).format("HH:mm"),
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate('/');
            } else {
                message.error(res.data.success);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };

    // Get doctor details
    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/getDoctorInfo',
                { userId: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDoctorInfo();
        //eslint-disable-next-line
    }, []);

    return (
        <Layout>
            <h1>Manage Profile</h1>
            {doctor && (
                <Form
                    layout="vertical"
                    onFinish={handleFinish}
                    className="m-3"
                    initialValues={{
                        ...doctor,
                        timings: doctor.timings && doctor.timings.length === 2
                            ? [
                                moment(doctor.timings[0], 'HH:mm'),
                                moment(doctor.timings[1], 'HH:mm')
                              ]
                            : [],
                        feesperConsultation: doctor.feesPerConsultation,
                    }}
                >
                    <h4>Personal Details</h4>
                    <Row gutter={20}>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>First Name</span>}
                                name="firstName"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Your first name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Last Name</span>}
                                name="lastName"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Your last name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Email</span>}
                                name="email"
                                rules={[{ required: true, type: 'email' }]}
                            >
                                <Input type="email" placeholder="Your email" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Phone Number</span>}
                                name="phone"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Your phone number" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Address</span>}
                                name="address"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Your address" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Website</span>}
                                name="website"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Your website" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4>Professional Details</h4>
                    <Row gutter={20}>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Specialization</span>}
                                name="specialization"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Your specialization" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Experience</span>}
                                name="experience"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Your experience" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Fees per Consultation</span>}
                                name="feesperConsultation"
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Your consultation fees" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                label={<span style={{ color: 'black' }}>Timings</span>}
                                name="timings"
                                rules={[{ required: true }]}
                            >
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8} lg={8}></Col>
                        <Col xs={24} md={8} lg={8}>
                            <button className='btn btn-primary form-btn' type="submit">
                                Update
                            </button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Layout>
    );
};

export default Profile;
