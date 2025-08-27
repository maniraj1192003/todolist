const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const Todomodel = require('./Models/Todo'); // Import Todo model

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// ✅ GET all todos
app.get('/todos', (req, res) => {
  Todomodel.find()
    .then(result => res.json(result))
    .catch(error => {
      console.error("Error fetching todos:", error);
      res.status(500).json({ error: "Error fetching todos" });
    });
});

// ✅ POST (Add new todo)
app.post('/add', (req, res) => {
  const task = req.body.task;
  Todomodel.create({ task: task })
    .then(result => res.status(201).json(result))
    .catch(error => {
      console.error("Error adding todo:", error);
      res.status(500).json({ error: "Error adding todo" });
    });
});

// ✅ DELETE todo by id
app.delete('/todos/:id', async (req, res) => {
  try {
    const deleted = await Todomodel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send({ error: "Todo not found" });
    }
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).send({ error: "Error deleting todo" });
  }
});

app.listen(5000, () => {
  console.log("✅ Server is running on port 5000");
});
