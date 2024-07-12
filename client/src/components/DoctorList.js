import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    
    // Destructure doctor object for easier access
    const { _id, firstName, lastName, specialization, experience, feesperCunsaltation, timing } = doctor;

    return (
        <div className="card m-2" 
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/doctor/book-appointment/${_id}`)}>
            <div className='card-header'>
                Dr. {firstName} {lastName}
            </div>
            <div className='card-body'>
                <p>
                    <b>Specialization</b>: {specialization}
                </p>
                <p>
                    <b>Experience</b>: {experience}
                </p>
                <p>
                    <b>Fees per Consultation</b>: {feesperCunsaltation}
                </p>
                <p>
                    <b>Timing</b>: {timing && timing.length > 0 ? `${timing[0]} - ${timing[1]}` : 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default DoctorList;
