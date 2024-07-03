import React, { useState, useEffect } from 'react';
import './admin.css';
import AllDoctorsList from './doctorslist';
import AddDoctorForm from './adddoctor';
import AppointmentForm from './appointform';
import PatientList from '../doctor/PatientList';
import income from './images/income.png'
import stats from './images/stats.png'
import treatmemt from './images/treatment.png'

const AdminDashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeButton, setActiveButton] = useState('Dashboard');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/doctors/');
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      setDoctors(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleAddDoctor = (newDoctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
  };

  const handleDeleteDoctor = (updatedDoctors) => {
    setDoctors(updatedDoctors);
  };

  const handleDropdownItemClick = (option) => {
    setShowDropdown(false);
    if (option === 'Doctors List') {
      setActiveButton('Doctor');
    } else if (option === 'Add a Doctor') {
      setActiveButton('AddDoctor');
    } else {
      setActiveButton(option);
    }
  };

  const renderMainContent = () => {
    switch (activeButton) {
      case 'Appointments':
        return <AppointmentForm />;
      case 'Patients':
        return <PatientList />;
      case 'Settings':
        return <div>Payments Content</div>;
      case 'Doctor':
        return (
          <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <AllDoctorsList doctors={doctors} onDeleteDoctor={handleDeleteDoctor} />
          </>
        );
      case 'AddDoctor':
        return <AddDoctorForm onAddDoctor={handleAddDoctor} />;
      default:
        return (
          <>
          <div className="row">
          <div className="col-md-8">
            <div className="stats-card">
              <img src={stats} alt="Treatment Image" style={{ width: '800px', height: '450px' }} />
            </div>
            </div>
            <div className="col-md-3">
              <div className="income-card">
                <img src={income} alt="Treatment Image" style={{ width: '300px', height: '450px' }}/>
              </div>
            </div>
            </div>

          </>
        );
    }
  };

  return (
    <div className="panel">
      <div className="header2">
        <h2 className="header-title">Welcome back, Admin</h2>
        <button className="notification-button fa fa-bell" onClick={() => setShowDropdown(!showDropdown)}></button>
      </div>
      <div className={`left-panel ${isPanelOpen ? '' : 'closed'}`}>
        <div className="panel-content">
          <div className="button-container">
            <button className="panel-button main-button" onClick={() => setActiveButton('Dashboard')}>
              <i className="fas fa-th-large"></i>
              Dashboard
            </button>
            <div className="sub-buttons">

              <div className="dropdown">
                <button className="panel-button1 dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
                  <i className="fas fa-calendar-alt"></i>
                  <span>Doctor</span>
                </button>
                <div className={`dropdown-menu rounded-lg shadow-lg ${showDropdown ? 'show' : ''}`}>
                  <button className="dropdown-item" onClick={() => handleDropdownItemClick('Doctors List')}>
                    Doctors List
                  </button>
                  <button className="dropdown-item" onClick={() => handleDropdownItemClick('Add a Doctor')}>
                    Add a Doctor
                  </button>
                </div>
              </div>
              <button className="panel-button1" onClick={() => setActiveButton('Patients')}>
                <i className="fas fa-cog"></i>
                <span>Patients</span>
              </button>
              <button
                className="panel-button1"
                onClick={() => handleButtonClick('Appointments')}>
                <i className="fas fa-calendar-alt"></i>
                New_appointment
              </button>
              {/* <button className="panel-button1" onClick={() => setActiveButton('Payments')}>
                <i className="fas fa-dollar-sign"></i>
                <span>Payments</span>
              </button> */}
            </div>
          </div>
          <button className="panel-button logout-button" >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
        <button className="toggle-button" onClick={() => setIsPanelOpen(!isPanelOpen)}>
          <i className={`fas fa-${isPanelOpen ? 'minus' : 'plus'}`}></i>
        </button>
      </div>
      <div className={`main-content ${isPanelOpen ? '' : 'expanded'}`}>
        {renderMainContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
