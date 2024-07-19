import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeCards = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee/fetchAllEmployees');
        // Check if response.data is an array
        setEmployees(response.data.data);
        console.log('This is response data:',response.data)

      } catch (err) {
        setError('Failed to fetch employee details. Please try again.');
      }
    };

    fetchEmployeeDetails();
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (employees.length === 0) {
    return <p>Loading...</p>;
  }
 
  console.log(employees);
  return (
    <div className="employee-cards">
      <h2>Employee Details</h2>
      <div className="cards-container">
        {employees.map((employee, index) => (
          <div key={index} className="employee-card">
            <h3>{employee.employeeName}</h3>
            <p><strong>Email:</strong> {employee.employeeEmail}</p>
            <p><strong>Designation:</strong> {employee.designation}</p>
            <p><strong>Basic Salary:</strong> {employee.basic_Salary}</p>
            <p><strong>Date of Joining:</strong> {employee.date_of_joining}</p>
            <p><strong>Experience:</strong> {employee.experience}</p>
            <p><strong>Employee Provident Fund(EPF):</strong> {employee.EPF}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCards;

