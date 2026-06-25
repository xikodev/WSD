const movies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    description: 'A skilled thief enters dreams to steal secrets and is offered one last impossible job.'
  },
  {
    id: 2,
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    description: 'Batman faces the Joker as chaos spreads through Gotham City.'
  }
];

let nextId = 3;

function getAllMovies() {
  return movies;
}

function addMovie(movie) {
  const newMovie = {
    id: nextId++,
    title: movie.title,
    year: movie.year,
    genre: movie.genre,
    description: movie.description
  };

  movies.push(newMovie);
  return newMovie;
}

function deleteMovieById(id) {
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return false;
  }

  movies.splice(movieIndex, 1);
  return true;
}

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovieById
};
