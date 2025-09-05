import MovieCard from './MovieCard';
import 'typeface-roboto';
import { useEffect, useState } from 'react';

function MovieList() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Use Effect Called");

    fetch("https://api.jsonsilo.com/public/31707bac-e12c-420d-99f5-3c6f57d6a25f")
      .then(response => {
        if (!response.ok) throw new Error("Couldn't fetch data");
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          throw new Error("Invalid Data Format");
        }
      })
      .catch(err => setError(err.message));
  }, []);

  function handleDelete(id) {
    const newMovie = movies.filter(movie => movie.id !== id);
    setMovies(newMovie);
  }

 if (!movies) {
  return (
    <>
      {!error && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // full viewport height
          }}
        >
          <img src="data/assets/loading.gif" alt="loading" />
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}


  const movieList = movies.map(movie => (
    <MovieCard
      key={movie.id}
      title={movie.title}
      price={movie.price}
      payment={movie.payment}
      rating={movie.rating}
      image={movie.image}
      delete={handleDelete}
      id={movie.id}
    />
  ));

  return (
    <>
      <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>Netflix Clone</h1>
      {movieList}
    </>
  );
}

export default MovieList;
