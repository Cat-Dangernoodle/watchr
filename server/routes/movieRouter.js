/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');
const dbController = require('../controllers/dbController');
const userController = require('../controllers/userController');

const router = express.Router();

// handle post request to search for requested movie
router.post(
  '/search',
  userController.getIMDB,
  userController.searchServices,
  (req, res) => {
    console.log('Search results: ', res.locals.result);
    res.status(200).json(res.locals.result);
  },
);

module.exports = router;