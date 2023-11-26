const mongoose = require('mongoose');

// Todo Schema and Model
const todoSchema = new mongoose.Schema({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel;