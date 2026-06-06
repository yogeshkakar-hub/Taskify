const Todo = require('../models/Todo');

// @desc    Get all todos for authenticated user
// @route   GET /api/todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new todo for authenticated user
// @route   POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    // Strict validation — reject empty or whitespace-only titles
    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: 'Title cannot be empty' });
    }

    const todo = await Todo.create({ 
      title: title.trim(), 
      description, 
      priority,
      user: req.user._id 
    });
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a specific todo belonging to authenticated user
// @route   PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    // Ensure the todo exists and belongs to the authenticated user
    let todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: 'Todo not found' });
    }

    todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a specific todo belonging to authenticated user
// @route   DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    // Ensure the todo exists and belongs to the authenticated user
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: { id: req.params.id } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
