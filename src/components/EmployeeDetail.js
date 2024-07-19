
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const storedId = localStorage.getItem("employeeId");
  const storedId2 = localStorage.getItem("userRole"); // Assuming you have userRole stored in localStorage

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const employeeId = localStorage.getItem("employeeId");
      if (!employeeId) {
        setError('No employee ID found. Please login again.');
        navigate('/');
        return;
      }

      try {
        const id = JSON.parse(employeeId);
        const response = await axios.get(`http://localhost:5000/api/employee/fetchSingleEmployeeDetails/${id}`);
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee details. Please try again.');
      }
    };

    // Only fetch employee details if the user is not an admin
    if (storedId2 !== "Admin") {
      fetchEmployeeDetails();
    }
  }, [navigate, storedId2]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="employee-details">
      <h2>Employee Details</h2>

      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Basic Salary</th>
            <th>Date of Joining</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{employee.Data.employeeName}</td>
            <td>{employee.Data.employeeEmail}</td>
            <td>{employee.Data.designation}</td>
            <td>{employee.Data.basic_Salary}</td>
            <td>{employee.Data.date_of_joining}</td>
            <td>{employee.Data.experience}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetail;






