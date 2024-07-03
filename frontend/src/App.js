import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorDashboard from './components/doctor/doctor';
import HomePage from './components/home/home/home';
import LoginPage from './components/login/doctor/doctorlogin';
import AdminLogin from './components/login/admin/adminlogin'
import AdminDashboard from './components/admin/admin';
import MyComponent from './components/MyComponent';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctorlogin" element={<LoginPage />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/login/admin" element={<HomePage />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginPage from './components/login/doctor/doctorlogin'

// function App() {
//   return (
//       <LoginPage/>
//     );
// }

// export default App;
