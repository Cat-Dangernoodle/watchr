/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const axios = require('axios');
const variables = require('../../variables');

const movieController = {};

// get "IMDB key" of each film
movieController.getIMDB = (req, res, next) => {
  const { title } = req.query;

  const options = {
    method: 'GET',
    url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
    params: { s: `${title}`, page: '1', type: 'movie', r: 'json' },
    headers: {
      'x-rapidapi-key': variables.imdbAPI,
      'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then((response) => {
      // Could use extra data to populate a "Close matches" field
      res.locals.imdb = response.data.Search[0].imdbID;
      return next();
    })
    .catch((error) => {
      console.error(error);
      return next(error);
    });
};

// TO-DO: send streaming links along with movie data to be displayed on front-end
// query streaming-availability API for whether a given film is available on streaming
movieController.getServices = (req, res, next) => {
  // need info stored at res.locals.imdb to continue
  if (res.locals.imdb === undefined) return next({ message: 'error fetching film' });

  // parse cookies to read user services
  console.log('Search query: ', req.body.search);
  const array = [];
  const userServices = JSON.parse(req.cookies.userServices);
  Object.keys(userServices).forEach((service) => {
    // console.log('Service: ', service);
    if (userServices[service]) {
      array.push(service);
    }
  });

  // if array has no values, return 'no results' with no api call
  if (array.length === 0) {
    // res.locals.body = 'No results';
    return next();
  }

  // options for API request
  const options = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/get/basic',
    params: { country: 'us', imdb_id: `${res.locals.imdb}` },
    headers: {
      'x-rapidapi-key': variables.streamingAPI,
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
    },
  };

  // streaming API request
  axios
    .request(options)
    .then((response) => {
      res.locals.movie = {};
      // console.log(response.data);
      // streaming info at response.data.streamingInfo.netflix.us.link
      // STEP 1: Add corresponding streaming services to obj
      Object.keys(response.data.streamingInfo).forEach((el) => {
        // if streaming service is on streamingArray, add to res.locals object
        // res.locals.movie.hulu = true
        if (array.includes(el)) {
          res.locals.movie[el] = true;
        }
      });
      // STEP 2: Add poster and title to the obj
      res.locals.movie.poster = response.data.posterURLs['342'];
      res.locals.movie.title = response.data.title;

      return next();
    })
    .catch((error) => {
      console.error(error);
      return next(error);
    });
}

module.exports = movieController;
