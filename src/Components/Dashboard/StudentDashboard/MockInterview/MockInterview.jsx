import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './MockInterview.css'; // Import the CSS file
import logo from '../../../logo.png';
import Cookies from 'js-cookie';

const MockInterview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const { email } = state || {};
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [rating, setRating] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    if (email) {
      axios.get(`https://mockinterview-backend.onrender.com/api/students/${email}`)
        .then(response => {
          console.log('API Response:', response.data);
          setInterviews(response.data);
        })
        .catch(error => {
          console.error('Error fetching mock interviews:', error);
        });
    }
  }, [email]);
  const mockInterview = () => {
    navigate('/mockinterview',{state:{email}})
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

  const handleRateClick = (interview) => {
    setSelectedInterview(interview);
    setShowRatingModal(true);
  };

  const handleRatingSubmit = () => {
    if (selectedInterview) {
      axios.put(`https://mockinterview-backend.onrender.com/api/${selectedInterview.id}`, {
        mentor_score: rating
      })
      .then(() => {
        // Update the interviews state with the new rating
        setInterviews(prevInterviews => prevInterviews.map(interview =>
          interview.id === selectedInterview.id
            ? { ...interview, mentor_score: rating }
            : interview
        ));
        setShowRatingModal(false);
      })
      .catch(error => {
        console.error('Error submitting rating:', error);
      });
    }
  };

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
    
    <div className="mock-interview-container">
      <h1 className="mock-interview-header">Mock Interviews for {email}</h1>
      <table className="mock-interview-table">
        <thead>
          <tr>
            <th>Mentor Name</th>
            <th>Duration</th>
            <th>Topics</th>
            <th>Mock Date</th>
            <th>Mock Time</th>
            <th>Status</th>
            <th>Student Score</th>
            <th>Rate Mentor</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(interviews) && interviews.length > 0 ? (
            interviews.map(interview => (
              <tr key={interview.id}>
                <td>{interview.mentor_name || 'N/A'}</td>
                <td>{interview.duration} mins</td>
                <td>{JSON.parse(interview.topics).join(', ')}</td>
                <td>{interview.mock_date}</td>
                <td>{interview.mock_time}</td>
                <td>{interview.status}</td>
                <td>{interview.student_score === 0 ? 'In Progress' : interview.student_score}</td>
                <td>
                  {interview.student_score === 0 && (
                    <button
                      className="rate-button"
                      onClick={() => handleRateClick(interview)}
                    >
                      Rate
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-interviews">No mock interviews found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showRatingModal && (
        <div className="rating-modal-overlay">
          <div className="rating-modal">
            <h2>Rate Mentor</h2>
            <div className="stars">
              {[...Array(10)].map((_, index) => (
                <span
                  key={index}
                  className={`star ${rating > index ? 'selected' : ''}`}
                  onClick={() => setRating(index + 1)}
                >
                  ★
                </span>
              ))}
            </div>
            <button onClick={handleRatingSubmit}>Submit Rating</button>
            <button onClick={() => setShowRatingModal(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
      </div>
  );
};

export default MockInterview;
