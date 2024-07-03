import React, { useState } from 'react';
import './doctorslist.css';

const AllDoctorsList = ({ doctors, onDeleteDoctor }) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  const handleDeleteDoctor = async (doctorId) => {
    try {
      console.log(`Attempting to delete doctor with ID: ${doctorId}`);
  
      const response = await fetch(`http://localhost:8000/api/doctors/${doctorId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to delete doctor:', errorText);
        throw new Error(`Failed to delete doctor: ${errorText}`);
      }
  
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== doctorId);
      onDeleteDoctor(updatedDoctors);
  
      console.log('Doctor deleted successfully');
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };
  

  return (
    <div className="all-doctors-list-container">
      <h2 className="list-heading">All Doctors List</h2>
      <table className="doctors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Qualification</th>
            <th>Location</th>
            <th>Experience</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Languages</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className={selectedDoctorId === doctor.id ? 'selected' : ''}>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.qualification}</td>
              <td>{doctor.location}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.doctor_username}</td>
              <td>{doctor.doctor_password}</td>
              <td>{doctor.languages}</td>
              <td>
                <button
                  className="action-button delete"
                  onClick={() => handleDeleteDoctor(doctor.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDoctorsList;