/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');
const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');

const router = express.Router();

// handle post request for signup page and send back response
router.post('/signup',
  userController.signup,
  (req, res) => {
    return res.status(200).send({ user: res.locals.newUser });
  });

// handle post request for login and setting cookie and send back response
router.post(
  '/',
  userController.login,
  userController.setServicesCookie,
  (req, res) => {
    res.status(200).send({ user: res.locals.user });
  });

module.exports = router;