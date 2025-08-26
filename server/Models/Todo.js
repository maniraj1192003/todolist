const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,   // ✅ Correct type
    required: true
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
