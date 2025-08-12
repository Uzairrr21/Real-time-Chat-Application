const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

// Get all messages (protected route)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ room: 'general' })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new message (protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const message = new Message({
      sender: req.user.id,
      content,
      room: 'general'
    });
    
    await message.save();
    
    const populatedMessage = await Message.populate(message, {
      path: 'sender',
      select: 'username'
    });
    
    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;