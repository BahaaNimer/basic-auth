'use steict';
// 3rd party packages
const express = require('express');
const bcrypt = require('bcrypt');

// local modules
const { users } = require('../models/index.model');
const signUpRouter = express.Router();

// routes
signUpRouter.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await users.create(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});

module.exports = signUpRouter;