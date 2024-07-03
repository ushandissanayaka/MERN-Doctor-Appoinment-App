import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'

const BookingPage = () => {
  const params = useParams()
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null)
  const [timings, setTimings] = useState(null)
  const [available, setIsAvailable] = useState(false)
  
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [params.doctorId]);

  const handleCheckAvailability = () => {
    // Add your logic to check availability here
  }

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className='container m-2'>
        {doctor && (
          <div>
            <h4> 
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4>
              Fees: {doctor.feesperCunsaltation}
            </h4>
            <h4>
              Timings: {doctor.timings && doctor.timings[0]} - {doctor.timings && doctor.timings[1]} 
            </h4>
            <div className='d-flex flex-column w-50'>
              <DatePicker 
                className='m-2'
                format='DD-MM-YYYY' 
                onChange={(value) => setDate(moment(value).format('DD-MM-YYYY'))}
              />
              <TimePicker.RangePicker 
                format='HH:mm' 
                className='m-2'
                onChange={(values) => setTimings([
                  moment(values[0]).format('HH:mm'),
                  moment(values[1]).format('HH:mm'),
                ])}
              />
              <button className='btn btn-primary mt-2' onClick={handleCheckAvailability}>
                Check Availability
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default BookingPage
