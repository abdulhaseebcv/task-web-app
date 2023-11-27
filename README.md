# Task Web App

A simple Todo application built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

**Prerequisites:**
Make sure you have Node.js and npm installed.

**Installation and Setup:**

1. Clone the repository, navigate to the project root directory:

    ```bash
    git clone https://github.com/your-username/task-web-app.git
    cd task-web-app
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Navigate to the frontend folder, install frontend dependencies:

    ```bash
    cd frontend
    npm install
    ```

## Setting Up Environment Variables

1. In the root folder, create a .env file.

2. Add the following variables to the .env file:

    ```env
    MONGODB_URI= 'mongodb+srv://your-username:your-password@cluster.mongodb.net/your-database'
    JWT_SECRET_KEY='your-secret-key'
    JWT_TOKEN_EXP='token-expiration'
    ```

    Replace 'your-username', 'your-password', and 'your-database' with your MongoDB credentials and JWT details.

3. In the frontend folder, create a .env file and add:

    ```env
    REACT_APP_SERVER_API=''
    ```

    Replace your-api with the actual API endpoint where your backend server is running. If your backend is running locally, it could be http://localhost:5000 or any other endpoint where your backend server is hosted.

## Running the Project

### Backend:

```bash
# In the root folder
npm start
```
This will start the server.

### Frontend:

```bash
# In the frontend folder
npm start
```
This will start the development server for frontend.

Now you should be able to access the Todo app at http://localhost:3000.

## Database Configuration
Make sure you have MongoDB installed and running. Update the database configuration in the backend .env file.

## Frontend
The frontend of this Todo app is built with React. You can find the frontend code in the 'frontend' directory.

## Additional Information
This Todo app uses MongoDB Atlas as the database. You can create a free account and obtain a connection string.
