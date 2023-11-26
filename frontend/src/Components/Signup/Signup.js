import React, { useState } from 'react'
import axios from '../../Config';
import { Button, Container, Form, InputField, AuthContainer, Logo, NavigateLink, ErrorMessage } from './SignupStyle'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  // State to manage user input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to manage form validation errors and API errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Function to validate the login form
  const validateForm = () => {
    const validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      validationErrors.email = 'Enter a valid email address';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(validationErrors);

    // Returning true if there are no validation errors
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    // If the form is valid, make an API call
    isValid &&
      axios.post('/user/register', { username, email, password })
        .then((response) => {
          console.log('Registration successful:', response?.data);
          if (response?.data?.success) {
            toast.success(response?.data?.message);

            // Navigating to the home page after a delay if success
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
        })
        .catch((error) => {
          console.error('Registration failed:', error?.response?.data);

          // Setting API error for display
          setErrors({ apiError: error?.response?.data?.message });
          toast.error('Registration failed. Please try again.');
        });

  };
  return (
    <Container>
      <AuthContainer>
        <Logo src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="" />
        <Form onSubmit={handleSubmit}>
          <InputField
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          <InputField
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <InputField
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Button type='submit'>Register</Button>
          {errors.apiError && <ErrorMessage>{errors.apiError}</ErrorMessage>}
        </Form>
        <p>
          Already have an account?<NavigateLink to='/login'>Login</NavigateLink>
        </p>
      </AuthContainer>
      <ToastContainer
        closeOnClick
        draggable
        closeButton={false}
        autoClose={2000}
        loading={true}
      />
    </Container>
  )
}

export default Signup