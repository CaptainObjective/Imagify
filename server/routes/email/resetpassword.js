const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const reset = require('./emailitems');
const { User } = require('../../model/user');
const { sendWelcomeEmail } = require('./email');

const jwtKey = process.env.JWT_RESET_SECRET;

router.post('/reset', async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  const tokenLifeTime = 2 * 60 * 60 * 1000;
  console.log(user);

  const token = jwt.sign({ _id: user._id }, jwtKey);
  res.header('auth', token).json({ email });
  user.resetToken = token;
  user.resetTokenExpiration = Date.now() + tokenLifeTime;

  if (!user) return res.status(400).json({ error: 'Invalid email' });
  else {
    const items = reset.reset(user.email, token);
    await sendWelcomeEmail(user.email, items.subject, items.text, items.html, token);
    user.save();
  }
});

router.post('/create', async (req, res) => {
  const { resetToken: resetToken } = req.query;
  if (!resetToken) return res.status(401).json({ error: 'No token' });
  const accountValidity = User.findOne({ resetToken: resetToken, resetTokenExpiration: { $gt: Date.now() } });

  if (accountValidity) {
    const user = jwt.verify(resetToken, jwtKey);
    const { _id } = user;

    if (_id) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.query.password, salt);
      await User.findOneAndUpdate({ _id: user._id }, { $set: { password } }, { new: true });
      return res.json({ user });
    }
  }
  res.status(400).json({ error: 'Invalid token' });
});
module.exports = router;
