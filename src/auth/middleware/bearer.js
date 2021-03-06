'use strict';

const { users } = require('../models/index.js')


const bearerAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { next('Invalid Login');}

    const token = req.headers.authorization.split(' ').pop();

    const validUser = await users.authenticateWithToken(token);
    if(validUser) {
    req.user = validUser;
    req.token = validUser.token;
    next();
    }
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
}

module.exports = bearerAuth;