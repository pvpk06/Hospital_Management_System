import React, { useState, useEffect } from 'react';
import './doctorprofile.css';

const DoctorProfile = ({ onSaveChanges }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [editedFields, setEditedFields] = useState({
    name: '',
    specialization: '',
    qualification: '',
    location: '',
    experience: 0,
    email: '',
    phone: '',
    languages: '',
    doctor_username: '',
    doctor_password: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/doctors/');
        if (!response.ok) {
          throw new Error('Failed to fetch doctor details');
        }
        const data = await response.json();
        if (data.length > 0) {
          setDoctor(data[0]);
          setEditedFields({
            name: data[0].name,
            specialization: data[0].specialization,
            qualification: data[0].qualification,
            location: data[0].location,
            experience: data[0].experience,
            email: data[0].email,
            phone: data[0].phone,
            languages: data[0].languages,
            doctor_username: data[0].doctor_username,
            doctor_password: data[0].doctor_password,
          });
        }
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await onSaveChanges(editedFields);
      setIsEditing(false);
      // Update the doctor state with the editedFields
      setDoctor(editedFields);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="doctor-profile">
      <div className="profile-content">
        {doctor ? (
          isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={editedFields.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Specialization:</label>
                <input
                  type="text"
                  name="specialization"
                  value={editedFields.specialization}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Qualification:</label>
                <input
                  type="text"
                  name="qualification"
                  value={editedFields.qualification}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={editedFields.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Experience:</label>
                <input
                  type="number"
                  name="experience"
                  value={editedFields.experience}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedFields.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={editedFields.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Languages:</label>
                <input
                  type="text"
                  name="languages"
                  value={editedFields.languages}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="doctor_username"
                  value={editedFields.doctor_username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="text"
                  name="doctor_password"
                  value={editedFields.doctor_password}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleSaveChanges}>Save</button>
            </div>
          ) : (
            <div>
              <h2>Name: {doctor.name}</h2>
              <div className="specialization">
                <span className="label">Specialization:</span>
                <span className="value">{doctor.specialization}</span>
              </div>
              <div className="qualification">
                <span className="label">Qualification:</span>
                <span className="value">{doctor.qualification}</span>
              </div>
              <div className="location">
                <span className="label">Location:</span>
                <span className="value">{doctor.location}</span>
              </div>
              <div className="experience">
                <span className="label">Experience:</span>
                <span className="value">{doctor.experience} years</span>
              </div>
              <div className="email">
                <span className="label">Email:</span>
                <span className="value">{doctor.email}</span>
              </div>
              <div className="phone">
                <span className="label">Phone:</span>
                <span className="value">{doctor.phone}</span>
              </div>
              <div className="languages">
                <span className="label">Languages:</span>
                <span className="value">{doctor.languages}</span>
              </div>
              <div className="username">
                <span className="label">Username:</span>
                <span className="value">{doctor.doctor_username}</span>
              </div>
              <div className="password">
                <span className="label">Password:</span>
                <span className="value">{doctor.doctor_password}</span>
              </div>
              <div className="edit-icon" onClick={handleEditClick}>
                <i className="fas fa-edit"></i>
              </div>
            </div>
          )
        ) : (
          <p>No doctor details found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
