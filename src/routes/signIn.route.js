'use steict';
// 3rd party packages
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

// local modules
const { users } = require('../models/index.model');
const signInRouter = express.Router();
const basicAuth = require('../auth/basicAuth');

// routes
signInRouter.post('/signin', basicAuth, async (req, res) => {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encoded = basicHeaderParts[1];  // sdkjdsljd=
  let decoded = base64.decode(encoded); // "username:password"
  let [username, password] = decoded.split(':'); // username, password
  try {
    const user = await users.findOne({ where: { username: username } });
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      res.status(200).json({
        message: 'Successfully signed in',
        user: `The user ${user.username}`,
      });
    }
  } catch (e) { res.status(403).send('Invalid Login'); }
});

module.exports = signInRouter;