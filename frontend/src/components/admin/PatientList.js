import React, { useState } from 'react';
import './patientlist.css';

const PatientList = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCheckboxChange = (appointmentId) => {
    setSelectedAppointment(appointmentId);
  };

  const handleApprove = async (appointmentId) => {
    try {
      // Fetch the appointment details including the medicine information
      const response = await fetch(`http://localhost:8000/api/appointments/${appointmentId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointment details');
      }
      const appointment = await response.json();
  
      // Update the appointment status to "approved"
      appointment.status = 'approved';
  
      // Update the medicine information (assuming it's a field in the appointment)
      appointment.medicine_used = 'Updated medicine'; // Update this with your new medicine data
  
      // Send a PUT request to update the appointment with the new data
      const putResponse = await fetch(`http://localhost:8000/api/appointments/${appointmentId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      if (!putResponse.ok) {
        throw new Error('Failed to update appointment');
      }
  
      console.log(`Approved appointment with id: ${appointmentId}`);
      setSelectedAppointment(null); // Reset the selected appointment after approval
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };
  
  const handleCancel = async (appointmentId) => {
    try {
      // Fetch the appointment details including the medicine information
      const response = await fetch(`http://localhost:8000/api/appointments/${appointmentId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointment details');
      }
      const appointment = await response.json();
  
      // Update the appointment status to "cancelled"
      appointment.status = 'cancelled';
  
      // Clear the medicine information or update it as needed
      appointment.medicine_used = ''; // Clearing medicine information in this example
  
      // Send a PUT request to update the appointment with the new data
      const putResponse = await fetch(`http://localhost:8000/api/appointments/${appointmentId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
      if (!putResponse.ok) {
        throw new Error('Failed to update appointment');
      }
  
      console.log(`Canceled appointment with id: ${appointmentId}`);
      setSelectedAppointment(null); // Reset the selected appointment after cancellation
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };
  
  return (
    <div className="appointments-container">
      <h2>Today's Appointments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Patient Name</th>
            <th>Date & Time</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Disease</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedAppointment === appointment.id}
                  onChange={() => handleCheckboxChange(appointment.id)}
                />
              </td>
              <td>{appointment.patientName}</td>
              <td>{appointment.dateTime}</td>
              <td>{appointment.email}</td>
              <td>{appointment.mobile}</td>
              <td>{appointment.disease}</td>
              {selectedAppointment === appointment.id && (
                <td>
                  <button onClick={() => handleApprove(appointment.id)}>
                    Approve
                  </button>
                  <button onClick={() => handleCancel(appointment.id)}>
                    Cancel
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
