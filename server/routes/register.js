const _ = require('lodash');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { sendWelcomeEmail } = require('./email/email');
const { User } = require('../model/user');
const Welcome = require('./email/emailitems');

const jwtKey = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const { error } = User.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: 'User already registered' });
  else {
    user = await new User(_.pick(req.body, ['email', 'password', 'favourities']));
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = jwt.sign({ _id: user._id }, jwtKey);

  // wysyłam do klienta tylko wyselekcjonowane dane
  //auth => name of header
  //token =>value
  res.header('auth', token).send(_.pick(user, ['email', 'favourities']));

  const itemsWelcom = await Welcome.welcome(user.email);
  await sendWelcomeEmail(user.email, itemsWelcom.subject, itemsWelcom.text, itemsWelcom.html);
});
module.exports = router;
