const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.redirect('/auth/login');
  } catch (err) {
    res.redirect('/auth/register');
  }
});

// Login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
}));

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;
