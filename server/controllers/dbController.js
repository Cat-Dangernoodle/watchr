/* eslint-disable linebreak-style */
const axios = require('axios');
const db = require('../models/userModels');
const variables = require('../../variables');

const dbController = {};

dbController.insertNetflix = async (req, res, next) => {
  res.locals.netflix = [];

  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/search/pro',
    params: {
      country: 'us',
      service: 'netflix',
      type: 'movie',
      order_by: 'original_title',
      keyword: 'scott pilgrim',
      // year_min: '2000',
      // year_max: '2020',
      // genre: '18',
      // page: '1',
      // desc: 'true',
      // language: 'en',
    },
    headers: {
      'x-rapidapi-key': variables.IMDBstring,
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.locals.netflix = response.data;
      next();
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = dbController;
