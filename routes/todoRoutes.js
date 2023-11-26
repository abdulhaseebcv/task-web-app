const express = require('express');
const router = express.Router();
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const verifyToken = require('../config/verifyToken')

// Routes for todo operations with authentication
router.get('/', verifyToken, getTodos);
router.post('/add', verifyToken, addTodo);
router.put('/update/:id', verifyToken, updateTodo);
router.delete('/delete/:id', verifyToken, deleteTodo);

module.exports = router;
