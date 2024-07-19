import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    employeeFirstName: '',
    employeeLastName: '',
    employeeEmail: '',
    employeePassword: '',
    designation: '',
    basic_Salary: '',
    date_of_joining: '',
    experience: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployeeDetails({
      ...employeeDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/employee/create', employeeDetails);
      alert('Employee created successfully');
      navigate('/employees');
    } catch (err) {
      setError('Failed to create employee. Please try again.');
    }
  };
   
  return (
    <div className="admin-dashboard">
      <h2>Create Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* <input type="text" name="admin_Name" placeholder="Admin Name" value={employeeDetails.admin_Name} onChange={handleChange} required /> */}
        <input type="text" name="employeeFirstName" placeholder="Enter First Name" value={employeeDetails.employeeFirstName} onChange={handleChange} required />
        <input type="text" name="employeeLastName" placeholder="Enter Last Name" value={employeeDetails.employeeLastName} onChange={handleChange} required />
        <input type="email" name="employeeEmail" placeholder="Enter Email" value={employeeDetails.employeeEmail} onChange={handleChange} required />
        <input type="password" name="employeePassword" placeholder="Enter Password" value={employeeDetails.employeePassword} onChange={handleChange} required />
        {/* <input type="text" name="designation" placeholder="Designation" value={employeeDetails.designation} onChange={handleChange} required /> */}
        <select name="designation" value={employeeDetails.designation} onChange={handleChange} required>
          <option value="" disabled>Select Designation</option>
          <option value="Developer">Developer</option>
          <option value="Tester">Tester</option>
          <option value="Data_Analyst">Data Analyst</option>
          <option value="Team_Lead">Team Lead</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
        </select>
        <input type="number" name="basic_Salary" placeholder="Basic Salary" value={employeeDetails.basic_Salary} onChange={handleChange} required />
        <input type="date" name="date_of_joining" placeholder="Date of Joining" value={employeeDetails.date_of_joining} onChange={handleChange} required />
        {/* <input type="text" name="experience" placeholder="Experience" value={employeeDetails.experience} onChange={handleChange} required /> */}
        <select name="experience" value={employeeDetails.experience} onChange={handleChange} required>
          <option value="" disabled>Select Experience</option>
          <option value="Fresher">Fresher</option>
          <option value="Experience_Candiate">Experience_Candiate</option>
        </select>
        <button type="submit">Create Employee</button>
      </form>
      <button onClick={() => navigate('/employees')} className="view-employees-button">View All Employees</button>
    </div>
  );
};

export default AdminDashboard;


