import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const
  Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/users/signIn', { email, password });
        const { empId, role } = response.data.data;
        console.log("empId", empId)
        localStorage.setItem("employeeId", JSON.stringify(empId));
        localStorage.setItem("role", JSON.stringify(role));
        // localStorage.setItem("_id", JSON.stringify(_id));
        if (response.ok) {
          alert('Login successfully')
        }
        if (response.data.data) {
          const storedId2 = JSON.parse(localStorage.getItem("role"));
          console.log("ll", storedId2)
          if (storedId2 !== "Admin") {
            navigate(`/employee/${empId}`);
          }
          else {
            navigate('/admin')
          }
        }
      } catch (err) {
        setError('Login failed. Please try again.');
      }
    };


    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">LogIn</button>
        </form>
      </div>
    );
  };

export default Login;



