import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, json } from 'react-router-dom';
import './App.css';
import Login from './logIn';
import Register from './Register';
import EmployeeDetail from './components/EmployeeDetail';
import AdminDashboard from './components/AdminDashboard';
import EmployeeCards from './components/EmployeeCards';

function App() {
  // const employee = { id: 1 }; // Example employee object for demonstration
  //  const restriction = JSON.parse(localStorage.getItem("_id"))
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/employee/:id" element={<EmployeeDetail />} /> {/* Modified route */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employees" element={<EmployeeCards />} />
          <Route path="/" element={<h1>Welcome to the App</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;







