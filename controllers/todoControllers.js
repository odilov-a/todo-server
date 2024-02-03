const Todo = require("../models/todoModal");

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" }); 
  }
};

exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    return res.json(todo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createTodo = async (req, res) => {
  const { task, description } = req.body;
  try {
    const newTodo = await Todo.create({ task, description });
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, description, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, description, completed },
      { new: true }
    );
    return res.json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    return res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
