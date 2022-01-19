'use strict';

const base64 = require('base-64');


const basicAuth = (user) => async (req, res, next) => {

  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ');
  let encodedString = basic.pop();
  let decodedString = base64.decode(encodedString);
  let [username, pass] = decodedString.split(':');

  console.log("u:", username, "p:", pass)
  try {
    req.user = await user.authenticateBasic(username, pass)
    next();
  } catch (e) {
    console.log("In basic auth", e)
    res.status(403).send('Invalid Login');
  }
}

module.exports = basicAuth;