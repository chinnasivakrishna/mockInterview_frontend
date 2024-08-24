import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mentors.css';  
import logo from '../../../logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const location = useLocation();
  const { state } = location;
  const { email } = state || {};
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://mockinterview-backend.onrender.com/api/mentor/average-scores')
      .then(response => {
        console.log('API Response:', response.data);
        setMentors(response.data);
      })
      .catch(error => {
        console.error('Error fetching mentors:', error);
      });
  }, []);

  const mockInterview = () => {
    navigate('/mockinterview',{state:{email:email}})
  }

  const mentor = () => {
    navigate('/mentors',{state:{email:email}})
  }

  const logout = () => {
    Cookies.remove('jwt_token');
    navigate('/login')
  }

  const start = () => {
    navigate('/student')
  }

  return (
    <div>
      <header style={{ "backgroundColor": "lightblue" }}>
        <nav>
          <div className="logo">
            <img src={logo} className='img' alt="logo" />
            <div className="navbar-buttons1">
              <button className="login-btn" onClick={(start)}>Start New</button>
              <button className="login-btn" onClick={mentor}>Mentors</button>
              <button className="login-btn" onClick={mockInterview}>Mock Interviews</button>
              <button className="join-btn" onClick={logout}>Log Out</button>
            </div>
          </div>
        </nav>
      </header>
    
    <div className="mentors-container">
      <h1 className="mentors-header">Mentors and Their Average Scores</h1>
      <table className="mentors-table">
        <thead>
          <tr>
            <th>Mentor Name</th>
            <th>Average Score</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(mentors) && mentors.length > 0 ? (
            mentors.map(mentor => (
              <tr key={mentor.mentor_name}>
                <td>{mentor.mentor_name}</td>
                <td>{mentor.average_score ? mentor.average_score.toFixed(2) : 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="no-mentors">No mentors found.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      </div>
  );
}

export default Mentors;
