const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: '할일을 입력해주세요' });
    }

    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { title, done } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, done },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다' });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: '할일을 찾을 수 없습니다' });
    }

    res.json({ message: '할일이 삭제되었습니다' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
