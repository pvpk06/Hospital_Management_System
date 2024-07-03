import React, { useState, useEffect } from 'react';
import './appointment.css'; // Import the CSS file

const TodaysAppointments = ({ doctorUsername }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchTodaysAppointments();
  }, []);

  const fetchTodaysAppointments = async () => {
    try {
      const date = new Date().toISOString().slice(0, 10);
      const response = await fetch(`http://localhost:8000/api/appointments`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="todays-appointments-container">
      <h2>Today's Appointments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Email</th>
            <th>Disease</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.name}</td>
              <td>{appointment.gender}</td>
              <td>{appointment.address}</td>
              <td>{appointment.email}</td>
              <td>{appointment.disease}</td>
              <td>{appointment.mobile || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysAppointments;
