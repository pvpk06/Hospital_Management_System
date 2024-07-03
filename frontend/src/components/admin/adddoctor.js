import React, { useState } from 'react';
import './adddoctor.css';

const AddDoctorForm = ({ onAddDoctor }) => {
  const [doctor, setDoctor] = useState({
    id: '',
    name: '',
    specialization: '',
    qualification: '',
    location: '',
    experience: '',
    email: '',
    phone: '',
    languages: '',
    doctor_username:'',
    doctor_password:''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/admin/add_doctor/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctor),
      });

      if (!response.ok) {
        throw new Error('Failed to add doctor');
      }

      const newDoctor = await response.json();
      onAddDoctor(newDoctor);
      setDoctor({
        id: '',
        name: '',
        specialization: '',
        qualification: '',
        location: '',
        experience: '',
        email: '',
        phone: '',
        languages: '',
      });
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <div className="add-doctor-form-container">
      <h2 className="form-heading">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="add-doctor-form">
        {Object.keys(doctor).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="text"
              id={key}
              name={key}
              value={doctor[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-button">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
