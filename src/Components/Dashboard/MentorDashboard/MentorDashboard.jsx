import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MentorDashboard.css'; 
import { useLocation,Link, useNavigate } from 'react-router-dom';
import logo from '../../logo.png';
import Cookies from 'js-cookie';

const MentorDashboard = () => {
    const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const location = useLocation();
  const { state } = location;
  const { email } = state || {};
  const mentorEmail = email;
  console.log(requests)
  useEffect(() => {
    axios.get(`https://mockinterview-backend.onrender.com/api/requests/${mentorEmail}`)
      .then(response => setRequests(response.data))
      .catch(error => console.error('Error fetching requests:', error));
  }, [mentorEmail]);

  const handleAccept = (request) => {
    setSelectedRequest(request);
  };

  const handleReject = (id) => {
    axios.post('https://mockinterview-backend.onrender.com/api/reject-request', { id })
      .then(response => {
        alert(response.data.message);
        setRequests(requests.filter(req => req.id !== id));
      })
      .catch(error => console.error('Error rejecting request:', error));
  };
  const mockInterview = () => {
    navigate('/mentormockinterview',{state:{email}})
  }

  const logout = () => {
    Cookies.remove('jwt_token');
    navigate('/login')
  }

  const handleConfirm = () => {
    axios.post('https://mockinterview-backend.onrender.com/api/accept-request', { id: selectedRequest.id, mock_date: date, mock_time: time , mentor_email:mentorEmail})
      .then(response => {
        alert(response.data.message);
        setSelectedRequest(null);
        setRequests(requests.map(req => req.id === selectedRequest.id ? { ...req, status: 'Accepted', mock_date: date, mock_time: time,mentor_email:mentorEmail } : req));
      })
      .catch(error => console.error('Error confirming request:', error));
  };

  return (
    <div>
      <header style={{ "backgroundColor": "lightblue" }}>
        <nav>
          <div className="logo">
            <img src={logo} className='img' alt="logo" />
            <div className="navbar-buttons1">
              <button className="login-btn" onClick={mockInterview}>Mock Interviews</button>
              <button className="join-btn"  onClick={logout}>Log Out</button>
            </div>
          </div>
        </nav>
      </header>
    
    <div className="mentor-dashboard">
      <h1>Mentor Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th> {/* New column for student name */}
            <th>Student Email</th>
            <th>Duration</th>
            <th>Topics</th>
            <th>Available Dates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.student_name}</td> {/* Display the student's name */}
              <td>{request.email}</td>
              <td>{request.duration}</td>
              <td>{JSON.parse(request.topics).join(', ')}</td>
              <td>{JSON.parse(request.dates).join(', ')}</td>
              <td>
                <button onClick={() => handleAccept(request)}>Accept</button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRequest && (
        <div className="overlay">
          <div className="card">
            <h2>Confirm Mock Interview</h2>
            <label>
              Date:
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <label>
              Time:
              <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </label>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={() => setSelectedRequest(null)}>Cancel</button>
          </div>
        </div>
      )}
      </div>
      </div>
  );
};

export default MentorDashboard;
