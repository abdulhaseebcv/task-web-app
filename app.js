// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./dbConnection');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');


// Instance of express
const app = express();

// Middleware
app.use(express.static('public'));

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
  };
app.use(cors(corsOptions));

// MongoDB connection
connectToMongoDB();
// Routes
app.use('/user', authRoutes);
app.use('/todos', todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));