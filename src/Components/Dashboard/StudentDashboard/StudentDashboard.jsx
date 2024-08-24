import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './StudentDashboard.css';
import Select from 'react-select';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../logo.png';
import Cookies from 'js-cookie';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [duration, setDuration] = useState('');
  const [topics, setTopics] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [sameTimings, setSameTimings] = useState(false);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [mockInterviews, setMockInterviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const location = useLocation();
  const { state } = location;
  const { email } = state || {};

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`https://mockinterview-backend.onrender.com/api/student/${email}`);
        const student = response.data;
        setIsPremium(student.ispremium);
        if (student.ispremium) {
          const mentorsResponse = await axios.get('https://mockinterview-backend.onrender.com/api/mentor');
          setMentors(mentorsResponse.data.map(mentor => ({
            value: mentor.email,
            label: mentor.Name
          })));
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [email]);

  const topicsOptions = [
  { value: 'FMCG Sales', label: 'FMCG Sales' },
  { value: 'Equity Research', label: 'Equity Research' },
  { value: 'Digital Marketing', label: 'Digital Marketing' },
  { value: 'Operations Management', label: 'Operations Management' },
  { value: 'Business Analytics', label: 'Business Analytics' },
  { value: 'Human Resource Management', label: 'Human Resource Management' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Investment Banking', label: 'Investment Banking' },
  { value: 'Financial Management', label: 'Financial Management' },
  { value: 'Product Management', label: 'Product Management' },
  { value: 'Supply Chain Management', label: 'Supply Chain Management' },
  { value: 'Risk Management', label: 'Risk Management' },
  { value: 'Corporate Finance', label: 'Corporate Finance' },
  { value: 'Retail Management', label: 'Retail Management' },
  { value: 'Healthcare Management', label: 'Healthcare Management' },
  { value: 'Real Estate Management', label: 'Real Estate Management' },
  { value: 'Strategic Management', label: 'Strategic Management' },
  { value: 'Entrepreneurship', label: 'Entrepreneurship' },
  { value: 'Sales Management', label: 'Sales Management' },
  { value: 'Media and Entertainment Management', label: 'Media and Entertainment Management' },
  { value: 'Luxury Brand Management', label: 'Luxury Brand Management' },
  { value: 'Sports Management', label: 'Sports Management' },
  { value: 'Public Policy', label: 'Public Policy' },
  { value: 'Energy Management', label: 'Energy Management' }
];


  const handleAddDate = (date) => {
    if (moment(date).isBefore(moment(), 'day')) {
      alert('Please select a valid date that is not in the past.');
      return;
    }
    setAvailableDates([...availableDates, { date, fromTime: '', toTime: '' }]);
  };

  const handleTimeChange = (index, timeType, timeValue) => {
    const updatedDates = [...availableDates];
    updatedDates[index][timeType] = timeValue;
    setAvailableDates(updatedDates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cost =
      duration === '30' ? 2000 : duration === '45' ? 3000 : duration === '60' ? 4000 : 0;

    const formattedDates = availableDates.map(({ date, fromTime, toTime }) => {
      const fromTimeToUse = sameTimings ? fromTime : fromTime;
      const toTimeToUse = sameTimings ? toTime : toTime;
      return `${moment(date).format('YYYY-MM-DD')} ${fromTimeToUse} - ${toTimeToUse}`;
    });

    const newInterview = {
      duration,
      topics: topics.map(t => t.value), 
      dates: formattedDates,
      cost,
      status: 'In Progress',
      email,
      mentor: selectedMentor ? selectedMentor.value : null 
    };
    console.log(newInterview);
    try {
      const response = await axios.post('https://mockinterview-backend.onrender.com/api/mock-interviews', newInterview);
      if (response.data.message === "Mock interview scheduled and requests sent to mentors") {
        setMockInterviews([...mockInterviews, newInterview]);
        setShowModal(true);
      } else {
        alert('Failed to schedule the mock interview.');
      }
    } catch (error) {
      console.error('Error scheduling mock interview:', error);
    }

    setDuration('');
    setTopics([]);
    setAvailableDates([]);
    setSameTimings(false);
    setFromTime('');
    setToTime('');
    setSelectedMentor(null);
  };

  const handleComplete = (index) => {
    const interview = mockInterviews[index];
    setMockInterviews(mockInterviews.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

  const handlePremiumPlan = async () => {
    try {
      const response = await axios.post('https://mockinterview-backend.onrender.com/api/student/update-premium', { email });
      if (response.data.message === 'Premium status updated successfully') {
        alert('Premium Plan activated successfully!');
        setShowPremiumModal(false);
        const studentResponse = await axios.get(`https://mockinterview-backend.onrender.com/api/student/${email}`);
        setIsPremium(studentResponse.data.ispremium);
      } else {
        alert('Failed to update premium status.');
      }
    } catch (error) {
      console.error('Error updating premium status:', error);
    }
  };

  return (
    <div>
      <header style={{ "backgroundColor": "lightblue" }}>
        <nav>
          <div className="logo">
            <img src={logo} className='img' alt="logo" />
            <div className="navbar-buttons1">
              <button className="login-btn" onClick={() => setShowPremiumModal(true)}>Premium Plan</button>
              <button className="login-btn" onClick={mentor}>Mentors</button>
              <button className="login-btn" onClick={mockInterview}>Mock Interviews</button>
              <button className="join-btn" onClick={logout}>Log Out</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="student-dashboard">
        <div className="form-section">
          <h2>Schedule Mock Interview</h2>
          <form onSubmit={handleSubmit} className="mock-interview-form">
            <div className="form-group">
              <label>Duration (minutes)</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} required>
                <option value="" disabled>Select Duration</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>

            <div className="form-group">
              <label>Topics</label>
              <Select
                isMulti
                options={topicsOptions}
                value={topics}
                onChange={(selectedOptions) => setTopics(selectedOptions)}
                className="select"
                classNamePrefix="react-select"
                placeholder="Select topics"
              />
            </div>

            {isPremium && (
              <div className="form-group">
                <label>Select Mentor</label>
                <Select
                  options={mentors}
                  value={selectedMentor}
                  onChange={(selectedOption) => setSelectedMentor(selectedOption)}
                  className="select"
                  classNamePrefix="react-select"
                  placeholder="Select a mentor"
                />
              </div>
            )}

            <div className="form-group">
              <label>Available Dates</label>
              <DatePicker
                selected={null}
                onChange={handleAddDate}
                placeholderText="Select a date"
                className="date-picker"
                isClearable
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={sameTimings}
                  onChange={(e) => setSameTimings(e.target.checked)}
                />
                Same timings for every date
              </label>
            </div>

            {sameTimings && (
              <div className="same-timings-group">
                <div className="form-group">
                  <label>From Time</label>
                  <input
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>To Time</label>
                  <input
                    type="time"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {!sameTimings &&
              availableDates.map((dateEntry, index) => (
                <div key={index} className="time-selection-group">
<p><strong>Date:</strong> {moment(dateEntry.date).format('YYYY-MM-DD')}</p>
<div className="form-group">
<label>From Time</label>
<input
type="time"
value={dateEntry.fromTime}
onChange={(e) => handleTimeChange(index, 'fromTime', e.target.value)}
required
/>
                  </div>
                                <div className="form-group">
                <label>To Time</label>
                <input
                  type="time"
                  value={dateEntry.toTime}
                  onChange={(e) => handleTimeChange(index, 'toTime', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}

        <textarea
          value={availableDates.map(dateEntry => {
            const fromTimeToUse = sameTimings ? fromTime : dateEntry.fromTime;
            const toTimeToUse = sameTimings ? toTime : dateEntry.toTime;
            return `${moment(dateEntry.date).format('YYYY-MM-DD')}: ${fromTimeToUse} - ${toTimeToUse}`;
          }).join('\n')}
          readOnly
          rows="5"
          className="dates-textarea"
            />
            <h4>Note:*If you want to select the mentor you want to buy premium*</h4>

        <button type="submit" className="submit-button">Schedule Interview</button>
      </form>
    </div>

    {showModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close-modal" onClick={closeModal}>&times;</span>
          {mockInterviews.map((interview, index) => (
            <div className="mock-interview-card" key={index}>
              <h3>Mock Interview</h3>
              <p><strong>Duration:</strong> {interview.duration} minutes</p>
              <p><strong>Topics:</strong> {interview.topics.join(', ')}</p>
              <p><strong>Available Dates:</strong> {interview.dates.join(', ')}</p>
              <p><strong>Cost:</strong> ${interview.cost}</p>
              <p><strong>Status:</strong> {interview.status}</p>
              <button className="complete-button" onClick={() => handleComplete(index)}>Check Out</button>
            </div>
          ))}
        </div>
      </div>
    )}

    {showPremiumModal && (
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close-modal" onClick={() => setShowPremiumModal(false)}>&times;</span>
          <h3>Premium Plan</h3>
          <p><strong>Cost:</strong> ₹5000 for one month</p>
          <button className="confirm-button" onClick={handlePremiumPlan}>Activate Premium Plan</button>
          <button className="cancel-button" onClick={() => setShowPremiumModal(false)}>Cancel</button>
        </div>
      </div>
    )}
  </div>
</div>
);
};

export default StudentDashboard;
