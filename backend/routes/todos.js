import express from 'express';
import Todo from '../Todo.js';
import { requireAuth } from '../authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      userId: req.userId 
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title: req.body.title, completed: req.body.completed },
      { new: true } 
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;