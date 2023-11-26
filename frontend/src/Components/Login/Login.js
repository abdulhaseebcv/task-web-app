import React, { useState } from 'react'
import axios from '../../Config';
import { Button, Container, Form, InputField, AuthContainer, Logo, NavigateLink, ErrorMessage } from '../Signup/SignupStyle'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

   // State to manage user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   // State to manage form validation errors and API errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Function to validate the login form

  const validateForm = () => {
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    // Returning true if there are no validation errors
    return Object.keys(validationErrors).length === 0;
  };

    // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    // If the form is valid, make an API call
    isValid && axios.post('/user/login', { email, password })
      .then((response) => {
        console.log('Registration successful:', response?.data);
        if (response?.data?.success) {
          
          // Storing token and user details in local storage
          localStorage.setItem('token', response?.data?.token);
          localStorage.setItem('user',JSON.stringify(response?.data?.userDetails))
          toast.success(response?.data?.message);

          // Navigating to the home page after a delay
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      })
      .catch((error) => {
        console.error('Registration failed:', error?.response?.data);

         // Setting API error for display
        setErrors({ apiError: error?.response?.data?.message });
        toast.error('Login failed. Please try again.');
      });

  };
  return (
    <Container>
      <AuthContainer>
        <Logo src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="" />
        <Form onSubmit={handleSubmit}>
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
          <Button type='submit'>Login</Button>
          {errors.apiError && <ErrorMessage>{errors.apiError}</ErrorMessage>}
        </Form>
        <p>
          Already have an account?<NavigateLink to='/signup'>Resgister</NavigateLink>
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

export default Login