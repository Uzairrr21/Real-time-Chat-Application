const Message = require('../models/Message');
const User = require('../models/User');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ room: 'general' })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });
      
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const message = new Message({
      sender: req.user.id,
      content,
      room: 'general'
    });
    
    await message.save();
    
    // Populate sender info before sending response
    const populatedMessage = await Message.populate(message, {
      path: 'sender',
      select: 'username'
    });
    
    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};