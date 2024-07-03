import React, { useState, useEffect } from 'react';
import './patientlist.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
  const [newMedicine, setNewMedicine] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/patients/');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleEditMedicine = (id) => {
    const patient = patients.find(patient => patient.id === id);
    setEditingPatient(patient);
    setNewMedicine(patient.medicine_used);
  };

  const handleMedicineChange = (e) => {
    setNewMedicine(e.target.value);
  };

  const handleMedicineSubmit = async (e) => {
    e.preventDefault();
    if (editingPatient) {
      try {
        const response = await fetch(`http://localhost:8000/api/patients/update_patient/${editingPatient.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ medicine_used: newMedicine }),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          setPatients(patients.map(patient =>
            patient.id === editingPatient.id ? { ...patient, medicine_used: newMedicine } : patient
          ));
          setEditingPatient(null);
          setNewMedicine('');
          alert('Medicine updated successfully!');
        } else {
          console.error('Failed to update medicine:', responseData);
          alert(`Failed to update medicine: ${responseData.error || response.statusText}`);
        }
      } catch (error) {
        console.error('Error updating medicine:', error);
        alert(`Error updating medicine: ${error.message}`);
      }
    }
  };
  

  const filteredPatients = patients.filter(patient => patient.id.toString().includes(searchId));

  return (
    <div className="appointments-container">
      <div className="search-container">
        <input
          type="text"
          value={searchId}
          onChange={handleSearchChange}
          placeholder="Search by ID..."
          className="search-input"
        />
        <i className="fa fa-search search-icon" aria-hidden="true"></i>
      </div>
      <h2>Patients List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Email</th>
            <th>Disease</th>
            <th>Appointment Date</th>
            <th>Mobile</th>
            <th>Medicine_used</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.firstname}</td>
              <td>{patient.lastname}</td>
              <td>{patient.dob}</td>
              <td>{patient.gender}</td>
              <td>{patient.address}</td>
              <td>{patient.email}</td>
              <td>{patient.disease}</td>
              <td>{patient.appointmentdate}</td>
              <td>{patient.mobile}</td>
              <td>{patient.medicine_used}</td>
              <td>
                <button onClick={() => handleEditMedicine(patient.id)}><i className="fa fa-edit"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPatient && (
        <div className="edit-medicine-container">
          <h2>Edit Medicine for Patient ID: {editingPatient.id}</h2>
          <form onSubmit={handleMedicineSubmit}>
            <div className="form-group">
              <label htmlFor="medicine">Medicine Used</label>
              <input
                type="text"
                id="medicine"
                value={newMedicine}
                onChange={handleMedicineChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Medicine</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingPatient(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatientList;
