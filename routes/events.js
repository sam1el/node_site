const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Middleware to check authentication
function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

// List events
router.get('/', async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.render('events', { events, user: req.user });
});

// Add event (form)
router.get('/add', ensureAuth, (req, res) => {
  res.render('add_event');
});

// Add event (submit)
router.post('/add', ensureAuth, async (req, res) => {
  const { title, description, date, location } = req.body;
  await Event.create({ title, description, date, location, createdBy: req.user._id });
  res.redirect('/events');
});

module.exports = router;
