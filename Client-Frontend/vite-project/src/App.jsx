import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import VerifyEmail from './pages/verifyemail';
import CareGroup from './pages/careGroup';
import GroupDashboard from './pages/groupDashboard';
import UserDashboard from './pages/UserDashboard'; // ✅ Add this import
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/caregroup" element={<CareGroup />} />
        <Route path="/group-dashboard" element={<GroupDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} /> {/* ✅ Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
