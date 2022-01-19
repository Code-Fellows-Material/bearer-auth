'use strict';

const jwt = require('jsonwebtoken');


const bearerAuth = (users) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();

    console.log("token:", token);
    const validUser = await users.authenticateWithToken(token);

    if(validUser) {
    req.user = validUser;
    req.token = validUser.token;
    next();
    } else {
      next('Invalid User');
    }

  } catch (e) {
    res.status(403).send('Invalid Login');;
  }
}

module.exports = bearerAuth;