/* eslint-disable linebreak-style */
// import express, { json, urlencoded } from 'express';
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const router = express.Router();
const app = express();
app.use(cookieParser());
app.use(cors());
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
app.use('/user', userRouter);
app.use('/movie', movieRouter);

// send HTML -- may not need to keep ?
app.get('/test', (req, res) => {
  res.status(200).send({ message: 'Test Response!' });
});

// send HTML
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

// 404 handler
app.use((req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'An unknown middleware error occurred',
    message: 'A server error occurred',
    status: 500,
  };
  const errObj = { ...defaultErr, ...err };
  console.log(errObj.log);
  res.status(errObj.status).send(errObj.message);
});

// listening for port 3000
app.listen(3000, () => {
  console.log('Server listening on port: 3000');
});

module.exports = app;
