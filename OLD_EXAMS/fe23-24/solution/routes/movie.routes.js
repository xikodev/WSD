const express = require('express');
const { getAllMovies, addMovie, deleteMovieById } = require('../repo/movie.repo');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('movieList', {
    movies: getAllMovies()
  });
});

router.get('/add', (req, res) => {
  res.render('addMovie', {
    errorMessage: null,
    formData: {
      title: '',
      year: '',
      genre: '',
      description: ''
    }
  });
});

router.post('/add', (req, res) => {
  const formData = {
    title: req.body.title ? req.body.title.trim() : '',
    year: req.body.year ? req.body.year.trim() : '',
    genre: req.body.genre ? req.body.genre.trim() : '',
    description: req.body.description ? req.body.description.trim() : ''
  };

  if (!formData.title || !formData.year || !formData.genre || !formData.description) {
    return res.status(400).render('addMovie', {
      errorMessage: 'All fields are required.',
      formData
    });
  }

  addMovie(formData);
  return res.redirect('/movies');
});

router.get('/delete/:id', (req, res) => {
  deleteMovieById(Number(req.params.id));
  res.redirect('/movies');
});

module.exports = router;
