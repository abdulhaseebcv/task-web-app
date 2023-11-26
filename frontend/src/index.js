import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './Context/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Using BrowserRouter to enable routing in the application */}
    <BrowserRouter basename='/'>
      {/* Wrapping the application with ThemeProvider to provide theme context */}
      <ThemeProvider>
        {/* The main App component representing the entire application */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>

);
