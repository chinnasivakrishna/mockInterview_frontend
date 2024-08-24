import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './MentorInterviews.css'; 
import logo from '../../../logo.png';
import Cookies from 'js-cookie';

const MentorInterviews = () => {
  const location = useLocation();
  const { state } = location;
  const { email } = state || {};
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      axios.get(`https://mockinterview-backend.onrender.com/api/${email}`)
        .then(response => {
          console.log('API Response:', response.data);
          setInterviews(response.data);
        })
        .catch(error => {
          console.error('Error fetching mentor interviews:', error);
        });
    }
  }, [email]);

  const openRatingModal = (interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const logout = () => {
    Cookies.remove('jwt_token');
    navigate('/login')
  }

  const requests = () => {
    navigate('/mentor', {state:{email:email}})
  }


  const submitRating = () => {
    if (selectedInterview) {
      axios.put(`https://mockinterview-backend.onrender.com/api/mentor/${selectedInterview.id}`, {
        student_score: rating
      })
        .then(response => {
          console.log('Rating updated:', response.data);
          setInterviews(interviews.map(interview =>
            interview.id === selectedInterview.id ? { ...interview, student_score: rating } : interview
          ));
          setIsModalOpen(false);
        })
        .catch(error => {
          console.error('Error updating rating:', error);
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
              <button className="login-btn" onClick={requests}>Requests</button>
              <button className="join-btn"  onClick={logout}>Log Out</button>
            </div>
          </div>
        </nav>
      </header>
    
    <div className="mentor-interviews-container">
      <h1 className="mentor-interviews-header">Interviews for Mentor: {email}</h1>
      <table className="mentor-interviews-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Duration</th>
            <th>Topics</th>
            <th>Mock Date</th>
            <th>Mock Time</th>
            <th>Status</th>
            <th>Student Score</th>
            <th>Mentor Score</th>
            <th>Rate Student</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(interviews) && interviews.length > 0 ? (
            interviews.map(interview => (
              <tr key={interview.id}>
                <td>{interview.student_name || 'N/A'}</td>
                <td>{interview.student_email}</td>
                <td>{interview.duration} mins</td>
                <td>{JSON.parse(interview.topics).join(', ')}</td>
                <td>{interview.mock_date}</td>
                <td>{interview.mock_time}</td>
                <td>{interview.status}</td>
                <td>{interview.student_score === 0 ? 'In Progress' : interview.student_score}</td>
                <td>{interview.mentor_score}</td>
                <td>
                  <button onClick={() => openRatingModal(interview)}>Rate</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="no-interviews">No interviews found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="rating-modal-overlay">
          <div className="rating-modal">
            <h2>Rate Student</h2>
            <div className="rating-stars">
              {[...Array(10)].map((_, index) => (
                <span
                  key={index + 1}
                  className={`star ${index + 1 <= rating ? 'selected' : ''}`}
                  onClick={() => handleRatingChange(index + 1)}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <button onClick={submitRating}>Submit Rating</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      </div>
      </div>
  );
}

export default MentorInterviews;
