import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Switch} from 'react-router-dom'
import Landing from './Components/LandingPage/Landing';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import StudentDashboard from './Components/Dashboard/StudentDashboard/StudentDashboard';
import MentorDashboard from './Components/Dashboard/MentorDashboard/MentorDashboard';
import MockInterview from './Components/Dashboard/StudentDashboard/MockInterview/MockInterview';
import MentorInterviews from './Components/Dashboard/MentorDashboard/MentorInterviews/MentorInterviews';
import Mentors from './Components/Dashboard/StudentDashboard/Mentors/Mentors';
import ProtectedRoute from './Components/ProtectedRoute'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' from element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/mentor" element={
          <ProtectedRoute>
            <MentorDashboard />
          </ProtectedRoute>
        } />
        <Route path='/mockinterview'  element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
        <Route path='/mentormockinterview' element={<ProtectedRoute><MentorInterviews /></ProtectedRoute>} />
        <Route path='/mentors' element={<ProtectedRoute><Mentors /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
