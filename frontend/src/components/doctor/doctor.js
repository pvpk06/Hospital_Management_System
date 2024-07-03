import React, { useState, useEffect } from 'react';
import './dashboard.css';
import PatientList from './PatientList';
import DoctorProfile from './doctorprofile';
import TodaysAppointments from './appointments';
import { useLocation } from 'react-router-dom';

const DoctorDashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeButton, setActiveButton] = useState('Dashboard');
  const [doctorData, setDoctorData] = useState({});
  const [appointmentsData, setAppointmentsData] = useState([]);
  const location = useLocation();
  const doctorUsername = location.state?.doctor_username || '';

  useEffect(() => {
    fetchDoctorData();
    fetchAppointmentsData();
  }, [doctorUsername]);

  const fetchDoctorData = async () => {
    try {
      const response = await fetch(`/api/doctors?username=${doctorUsername}`);
      if (!response.ok) {
        throw new Error('Failed to fetch doctor data');
      }
      const data = await response.json();
      setDoctorData(data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  const fetchAppointmentsData = async () => {
    try {
      const response = await fetch(`/api/appointments/`);
      if (!response.ok) {
        throw new Error('Failed to fetch appointments data');
      }
      const data = await response.json();
      setAppointmentsData(data);
    } catch (error) {
      console.error('Error fetching appointments data:', error);
    }
  };

  const handleSaveChanges = (updatedFields) => {
    setDoctorData(updatedFields);
  };

  const handleSettingsClick = () => {
    setShowDropdown(!showDropdown);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const renderMainContent = () => {
    switch (activeButton) {
      case 'Appointments':
        return <PatientList appointments={appointmentsData} />;
      case 'Patients':
        return <TodaysAppointments appointments={appointmentsData} />;
      case 'Settings':
        return (
          <DoctorProfile doctor={doctorData} onSaveChanges={handleSaveChanges} />
        );
      default:
        return (
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="service-block">
                    <div className="service-icon">
                      <i className="fas fa-calendar-alt"></i>
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Today's Appointments</h5>
                      <p className='service-info'>{appointmentsData.length} appointments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="service-block">
                    <div className="service-icon">
                      <i className="fas fa-medkit"></i>
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Total Treatments</h5>
                      <p className='service-info'>Treated : 450 Patients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="service-block">
                    <div className="service-icon">
                      <i className="fas fa-hand-holding-medical"></i>
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Earnings</h5>
                      <p className='service-info'>Fees earned: 650 $</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="service-block">
                    <div className="service-icon">
                      <i className="fas fa-notes-medical"></i>
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Treatment rating</h5>
                      <p className='service-info'>8.7/10 (220 ratings) </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
  };
}

  return (
    <div className="panel">
      <div className="header2">
        <h2 className="header-title">Welcome back, {doctorUsername}</h2>
        <div>
        </div>
      </div>
      <div className={`left-panel ${isPanelOpen ? '' : 'closed'}`}>
        <div className="panel-content">
          <div className="button-container">
            <button
              className="panel-button main-button"
              onClick={() => handleButtonClick('Dashboard')}
            >
              <i className="fas fa-th-large"></i>
              Dashboard
            </button>
            <div className="sub-buttons">
              <button
                className="panel-button1"
                onClick={() => handleButtonClick('Appointments')}>
                <i className="fas fa-calendar-alt"></i>
                Patients
              </button>
              <button
                className="panel-button1"
                onClick={() => handleButtonClick('Patients')}>
                <i className="fa-solid fa-notes-medical"></i>
                Appointments
              </button>
              <button
                className="panel-button1"
                onClick={() => handleButtonClick('Settings')}>
                <i className="fa-solid fa-user"></i>
                manage_Profile
              </button>
            </div>
          </div>
          <div className="settings-button-container">
            <button className="panel-button logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
        <button className="toggle-button" onClick={togglePanel}>
          <i
            className={`fas fa-${isPanelOpen ? 'fa-solid fa-plus' : 'fa-solid fa-plus'}`}
          ></i>
        </button>
      </div>
      <div className={`main-content ${isPanelOpen ? '' : 'expanded'}`}>
        {renderMainContent()}
      </div>
    </div>
  );
};

export default DoctorDashboard;

