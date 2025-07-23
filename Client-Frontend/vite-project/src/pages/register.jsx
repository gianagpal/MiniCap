import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../App.css';

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    gender: '',
    groupId: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const role = searchParams.get('role');
    const groupId = searchParams.get('groupId');
    if (role && groupId) {
      setFormData((prev) => ({ ...prev, role, groupId }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = existingUsers.some(user => user.email === formData.email);
    if (emailExists) {
      alert('Email already registered!');
      return;
    }

    const updatedUsers = [...existingUsers, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    console.log('Registered:', formData);
    setShowSuccess(true);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />

        <select name="role" onChange={handleChange} value={formData.role} disabled={!!formData.groupId}>
          <option value="">Select Role</option>
          <option value="Elderly">Elderly</option>
          <option value="Family Member">Family Member</option>
          <option value="Caregiver">Caregiver</option>
        </select>

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Already have an account?{' '}
        <span
          style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        >
          Login here
        </span>
      </p>

      {showSuccess && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSuccess(false)}>&times;</span>
            <p>Registration successful!</p>
            <button onClick={() => navigate('/login')}>Go to Login</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
