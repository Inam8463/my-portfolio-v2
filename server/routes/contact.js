const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const Message = require('../models/Message');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    // Save to MongoDB
    const newMsg = new Message({ name, email, subject, message });
    await newMsg.save();

    // Send email (optional - only if env vars set)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject || 'No Subject'} — from ${name}`,
        html: `<h3>New message from ${name}</h3><p><b>Email:</b> ${email}</p><p>${message}</p>`,
      });
    }

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message.', details: err.message });
  }
});

// GET /api/contact (admin - get all messages)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
