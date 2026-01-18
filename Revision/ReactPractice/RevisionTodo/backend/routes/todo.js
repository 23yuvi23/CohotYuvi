const express = require("express");
const auth = require("../middleware/auth");
const { Todo } = require("../db");

const router = express.Router();

// Add todo
router.post("/", auth, async (req, res) => {
  await Todo.create({
    title: req.body.title,
    completed: false,
    userId: req.userId
  });

  res.json({ message: "Todo added" });
});

// Get todos
router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json({ todos });
});

module.exports = router;
