import React, {useState, useEffect} from 'react'
import Layout from './../../components/Layout'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import { Col, Form, Input, Row ,TimePicker, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../../redux/features/alertSlice'
import moment from 'moment'

const Profile = () => {
    const {user} = useSelector(state => state.user)
    const [doctor , setDoctor ] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams();

//========update doc================
// Handle form submission
const handleFinish = async (values) => {
    try {
        dispatch(showLoading())
        const res = await axios.post('/api/v1/doctor/updateProfile', 
            {
                ...values, 
                userId:user._id, 
            },
            {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading())
        if (res.data.success) {
            message.success(res.data.message)
            navigate('/')
        }else{
            message.error(res.data.success)
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error)
        message.error('Something went wrong')
        
    }
};
//========update doc================
    //getDoc details
    const getDoctorInfo = async () => {
        try{
            const res = await axios.post('/api/v1/doctor/getDoctorInfo',
            {userId: params.id},
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if(res.data.success){
            setDoctor(res.data.data);
        }
        }catch (error){
            console.log(error)
        }
    };

    useEffect(() => {
       getDoctorInfo();
       //eslint-disable-next-line
    },[]);
  return (
    <Layout>
        <h1>Manage Profile</h1>
        {doctor && (
            <Form layout="vertical" 
            onFinish={handleFinish} 
            className="m-3" 
            initialValues={{
                ...doctor,
            }}
            >
            <h4 className="">Personal Details</h4>
            <Row gutter={20}>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        required
                        rules={[{ required: true }]}

                    >
                        <Input type="text" placeholder="Your first name" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="Your last name" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        required
                        rules={[{ required: true, type: 'email' }]}
                    >
                        <Input type="email" placeholder="Your email" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="Your phone number" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="Address"
                        name="address"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="Your address" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="website"
                        name="website"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="Your website" />
                    </Form.Item>
                </Col>
            </Row>
            <h4 className="">Professional Details</h4>
            <Row gutter={20}>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="Specialization"
                        name="specialization"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="Your specialization" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="Experience"
                        name="experience"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="Your experence" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="Fees per Cunsaltation"
                        name="feesperCunsaltation"
                        required
                        rules={[{ required: true }]}
                    >
                        <Input type="text" placeholder="Your contact no" />
                    </Form.Item>
                </Col>
                {/*<Col xs={24} md={8} lg={8}>
                    <Form.Item
                        label="Timings"
                        name="timing"
                        required
                        
                    >
                        <TimePicker.RangePicker  format="HH:mm"/>
                    </Form.Item>
                </Col>*/}
                <Col xs={24} md={8} lg={8} ></Col>
                <Col xs={24} md={8} lg={8} >
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