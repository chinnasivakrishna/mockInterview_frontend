import React, { useState } from 'react';
import './Register.css';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';
import register from './register.jpg';
import Footer from '../Foot/Footer';
import Header from '../Head/Header';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const rolesOptions = [
  { value: 'FMCG Sales', label: 'FMCG Sales' },
  { value: 'Equity Research', label: 'Equity Research' },
  { value: 'Digital Marketing', label: 'Digital Marketing' },
  { value: 'Digial Marketing', label: 'Digital Marketing' },
  { value: 'Digital Marketing', label: 'Digital Marketing' },
  { value: 'Digital Marketing', label: 'Digital Marketing' },
  // Add more roles as needed
];

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!username) {
      valid = false;
      errors['username'] = 'Username is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      valid = false;
      errors['email'] = 'Valid email is required';
    }
    if (!type) {
      valid = false;
      errors['type'] = 'Type is required';
    }

    if (!password || password.length < 6) {
      valid = false;
      errors['password'] = 'Password must be at least 6 characters';
    }

    if (type === 'mentor' && roles.length === 0) {
      valid = false;
      errors['roles'] = 'At least one role must be selected';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    
    
    console.log(roles.map(role => role.value))
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      try {
        if(type=='mentor'){
        const response = await axios.post("https://mockinterview-backend.onrender.com/api/mentor/add", {
          Name: username,
          Email: email,
          Password: password,
          Type: type,
          Roles: roles.map(role => role.value), // Send selected roles
        });
        if (response.data.message === 'employee added success full') {
          alert('Registration successful');
          navigate("/login");
          }
        }
        else {
          const response = await axios.post("https://mockinterview-backend.onrender.com/api/student/add", {
          Name: username,
          Email: email,
          Password: password,
          Type: type,
        });
        if (response.data.message === 'student added success full') {
          alert('Registration successful');
          navigate("/login");
          }
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    } else {
      setIsSubmitted(false);
    }
  };

  const handleRolesChange = (selectedOptions) => {
    setRoles(selectedOptions);
  };

  return (
    <div>
      <div className="register-form-container">
        <div className="register-form">
          <div className="register-form__title">Register</div>
          <form onSubmit={handleSubmit}>
            <div className="register-form__input-box">
              <div className="register-form__input-wrapper">
                <input
                  type="text"
                  className="register-form__input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <i className='bx bxs-user register-form__icon'></i>
              </div>
              {errors.username && <div className="register-form__error">{errors.username}</div>}
            </div>

            <div className="register-form__input-box">
              <div className="register-form__input-wrapper">
                <input
                  type="email"
                  className="register-form__input"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className='bx bxs-envelope register-form__icon'></i>
              </div>
              {errors.email && <div className="register-form__error">{errors.email}</div>}
            </div>

            <div className="register-form__input-box">
              <div className="register-form__input-wrapper">
                <select
                  className="register-form__input"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="" disabled>Select type</option>
                  <option value="student">Student</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
              {errors.type && <div className="register-form__error">{errors.type}</div>}
            </div>

            {type === 'mentor' && (
              <div className="register-form__input-box">
                <div className="register-form__input-wrapper1">
                  <Select
                    isMulti
                    options={rolesOptions}
                    value={roles}
                    onChange={handleRolesChange}
                    placeholder="Select roles"
                    
                    classNamePrefix="register-form__input"
                  />
                </div>
                {errors.roles && <div className="register-form__error">{errors.roles}</div>}
              </div>
            )}

            <div className="register-form__input-box">
              <div className="register-form__input-wrapper">
                <input
                  type="password"
                  className="register-form__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className='bx bxs-lock-alt register-form__icon'></i>
              </div>
              {errors.password && <div className="register-form__error">{errors.password}</div>}
            </div>

            <div className="register-form__btn-container">
              <button type="submit" className="register-form__btn">Register</button>
            </div>
          </form>
        </div>
        <div className='register-image'>
          <img src={register} className='register-images' alt="Registration" />
        </div>
      </div>
    </div>
  );
};

export default Register;
