const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  task: { type: String },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;