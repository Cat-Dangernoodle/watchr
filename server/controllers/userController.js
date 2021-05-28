/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const axios = require('axios');
const db = require('../models/userModels');
const variables = require('../../variables');

const userController = {};

// using parameterized queries to protect against sql injections
userController.signup = (req, res, next) => {
  const {
    newUser, newPassword, email, netflix, amazon, hulu,
  } = req.body;
  const values = [newUser, email, newPassword, netflix, hulu, amazon];
  const query = `
  INSERT INTO watchr.users(username, email, password, netflix, hulu, amazon)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING username, netflix, hulu, amazon;
  `;

  db.query(query, values)
    .then(response => {
      res.locals.newUser = response.rows[0].username;
      return next();
    })
    .catch((err) => {
      console.log('signup query error');
      console.log(err);
      return next({ err });
    });
};

// checks login info against database
userController.login = (req, res, next) => {
  const { username, password } = req.body;
  const values = [username, password];

  const loginQuery = `
  SELECT username, password
  FROM watchr.users
  WHERE username = $1 AND password = $2;
  `;

  db.query(loginQuery, values)
    .then(data => {
      res.locals.user = data.rows[0].username;
      return next();
    })
    .catch(err => next({ err }));
};

// fetch services user uses from database, sets to cookie for later access
userController.setServicesCookie = (req, res, next) => {
  const { username } = req.body;
  const values = [username];

  const query = `
  SELECT netflix, hulu, amazon
  FROM watchr.users
  WHERE username = $1;
  `;

  db.query(query, values)
    .then((data) => {
      // take query response and add info to cookies
      data.rows[0].prime = data.rows[0].amazon;
      delete data.rows[0].amazon;
      res.cookie('userServices', JSON.stringify(data.rows[0]));
      return next();
    })
    .catch(err => next({ err }));
};

module.exports = userController;

