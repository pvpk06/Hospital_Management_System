import React, { useState } from 'react';
import './appointmentform.css';
import Popup  from './popup'; // Import the Popup component

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    gender: '',
    mobile: '',
    address: '',
    email: '',
    previousVisit: false,
    disease: '',
    appointmentdate: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    setPopupMessage(''); // Reset popup message
    e.preventDefault();
    setSubmissionStatus(''); 

    try {
      const response = await fetch('http://localhost:8000/api/admin/create_patient/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      setSubmissionStatus('success'); // Set submission status to success
      setPopupMessage('Patient created successfully!');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      setSubmissionStatus('error'); // Set submission status to error
      setPopupMessage('There was an error submitting the form.');
    }
  };

  return (
    <div className="form-container">
      <h2>Book an Appointment</h2>
      {popupMessage && (
        <Popup message={popupMessage} onClose={() => setPopupMessage('')} />
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="previousVisit"
              checked={formData.previousVisit}
              onChange={handleChange}
            />
            Previous Visit
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="disease">Disease</label>
          <input
            type="text"
            id="disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            placeholder="Enter the disease"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentdate">Preferred Appointment Date</label>
          <input
            type="date"
            id="appointmentdate"
            name="appointmentdate"
            value={formData.appointmentdate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">
            <i className="fas fa-paper-plane"></i>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
