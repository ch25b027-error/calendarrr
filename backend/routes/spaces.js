import express from 'express';
import Space from '../Space.js';
import { requireAuth } from '../authMiddleware.js';

const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  try {
    const spaces = await Space.find({ members: req.userId });
    res.json(spaces);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newSpace = new Space({
      name: req.body.name,
      joinCode: joinCode,
      members: [req.userId]
    });
    
    const savedSpace = await newSpace.save();
    res.json(savedSpace);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/join', requireAuth, async (req, res) => {
  try {
    const space = await Space.findOne({ joinCode: req.body.joinCode.toUpperCase() });
    if (!space) return res.status(404).json({ message: 'Invalid join code' });
    
    if (space.members.includes(req.userId)) {
      return res.status(400).json({ message: 'You are already in this space' });
    }

    space.members.push(req.userId);
    await space.save();
    res.json(space);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;