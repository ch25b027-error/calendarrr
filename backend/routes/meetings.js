import express from 'express';
import Meeting from '../Meeting.js';
import Space from '../Space.js';
import authMiddleware from '../authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userSpaces = await Space.find({ members: req.userId });
    const spaceIds = userSpaces.map(space => space._id);

    const meetings = await Meeting.find({ spaceId: { $in: spaceIds } });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, start, end, spaceId } = req.body;
    const space = await Space.findOne({ _id: spaceId, members: req.userId });
    if (!space) return res.status(403).json({ message: 'Not authorized for this space' });

    const newMeeting = new Meeting({
      title, start, end, spaceId, createdBy: req.userId
    });
    
    const savedMeeting = await newMeeting.save();
    await Space.findByIdAndUpdate(spaceId, {expiresAt: new Date(end)});
    res.json(savedMeeting);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;