import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import HomePage from './Pages/HomePage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  
  // Checking if a token is present in local storage
  const token = localStorage.getItem('token')
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={token ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={token ? <Navigate to='/' /> : <Signup />} />
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
