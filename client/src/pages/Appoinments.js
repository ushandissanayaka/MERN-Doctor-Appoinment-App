import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './../components/Layout';
import moment from 'moment';
import { Table, message } from 'antd';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Ensure userId is available
            const res = await axios.get('/api/v1/user/user-appoinments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                params: {
                    userId: userId // Pass userId as a query parameter
                }
            });
            
            if (res.data.success) {
                setAppointments(res.data.data);
            } else {
                console.error('Failed to fetch appointments:', res.data.message);
                message.error('Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error.response || error.message);
            message.error('Error fetching appointments');
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const columns = [
        {
            key: '1',
            title: "ID",
            dataIndex: "_id",
        },
        {
            key: '2',
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>
                    {record.doctorId.firstName} {record.doctorId.lastName}
                </span>
            ),
        },
        {
            key: '3',
            title: "Phone",
            dataIndex: "phone",
            render: (text, record) => (
                <span>
                    {record.doctorId.phone}
                </span>
            ),
        },
        {
            key: '4',
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                    {moment(record.time).format('HH:mm')}
                </span>
            ),
        },
        {
            key: '5',
            title: "Status",
            dataIndex: "status",
        },
    ];

    return (
        <div>
            <Layout>
                <h1>Appointment Lists</h1>
                <Table columns={columns} dataSource={appointments} rowKey="_id" />
            </Layout>
        </div>
    );
};

export default Appointments;
