const express = require('express');
const { searchMovies } = require('../controller/movie_controller');
const router = express.Router();

router.get('/search', searchMovies);

module.exports = router;
