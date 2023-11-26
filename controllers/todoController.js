const Todo = require('../models/todo');

// Retrieve all todos for the authenticated user
const getTodos = (req, res) => {
    console.log(req.decoded);
    const userId = req.decoded.id;

    Todo.find({ user: userId })
        .then((result) => {
            console.log("result=>", result);
            res.status(200).json({ success: true, message: 'Todos retrieved successfully', result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Failed to retrieve todo. Please try again.' });
        })
}

// Add a new todo for the authenticated user
const addTodo = (req, res) => {
    const  {task}   = req.body
    console.log("req.decoded",req.decoded);
    const userId = req.decoded.id;

    Todo.create({
        task,
        user:userId
    })
        .then((addedTodo) => {
            console.log("result=>", addedTodo);
            res.status(201).json({ success: true, message: 'Todo added successfully' })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Failed to add todo. Please try again.' });
        })
}

// Update the completion status of a todo for the authenticated user
const updateTodo = (req, res) => {
    console.log(req.decoded);
    console.log(req.params.id);
    const userId = req.decoded.id;
    const todoId = req.params.id;
    const { status } = req.body

    Todo.updateOne({
        _id: todoId,
        user: userId
    }, {
        completed: status
    })
        .then((result) => {
            console.log("result=>", result);
            result.modifiedCount === 1
                ? res.status(204).json()
                : res.status(404).json({ success: false, message: 'Todo not found or conditions not met' })
        })
        .catch((error) => {
            console.log("error=>", error);
            res.status(500).json({ success: false, message: 'Failed to update todo. Please try again.' });
        });
}

// Delete a todo for the authenticated user
const deleteTodo = (req, res) => {
    console.log(req.decoded);
    console.log(req.params.id);
    const userId = req.decoded.id;
    const todoId = req.params.id;

    Todo.deleteOne({
        _id: todoId,
        user: userId
    })
        .then((result) => {
            console.log("result=>", result);
            result.deletedCount === 1
                ? res.status(204).json()
                : res.status(404).json({ success: false, message: 'Todo not found' })
        })
        .catch((error) => {
            console.log("error=>", error);
            res.status(500).json({ success: false, message: 'Failed to delete todo. Please try again.' });
        })
}


module.exports = { getTodos, addTodo, updateTodo, deleteTodo }