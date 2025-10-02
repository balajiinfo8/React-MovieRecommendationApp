// import MovieCard from './MovieCard';
// import 'typeface-roboto';
// import { useEffect, useState } from 'react';

// function MovieList() {
//   const [movies, setMovies] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log("Use Effect Called");

//     fetch("https://api.jsonsilo.com/public/31707bac-e12c-420d-99f5-3c6f57d6a25f")
//       .then(response => {
//         if (!response.ok) throw new Error("Couldn't fetch data");
//         return response.json();
//       })
//       .then(data => {
//         if (Array.isArray(data.movies)) {
//           setMovies(data.movies);
//         } else {
//           throw new Error("Invalid Data Format");
//         }
//       })
//       .catch(err => setError(err.message));
//   }, []);

//   function handleDelete(id) {
//     const newMovie = movies.filter(movie => movie.id !== id);
//     setMovies(newMovie);
//   }

//  if (!movies) {
//   return (
//     <>
//       {!error && (
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh', // full viewport height
//           }}
//         >
//           <img src="https://media1.tenor.com/m/1No9rO6uaZsAAAAC/xm-loader-xcelerate-media.gif" alt="loading" />
//         </div>
//       )}
//       {error && <p>{error}</p>}
//     </>
//   );
// }


//   const movieList = movies.map(movie => (
//     <MovieCard
//       key={movie.id}
//       title={movie.title}
//       price={movie.price}
//       payment={movie.payment}
//       rating={movie.rating}
//       image={movie.image}
//       delete={handleDelete}
//       id={movie.id}
//     />
//   ));

//   return (
//     <>
//       <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>Netflix Clone</h1>
//       {movieList}
//     </>
//   );
// }

// export default MovieList;

import MovieCard from './MovieCard';  
import 'typeface-roboto';
import { useEffect, useState } from 'react';

function MovieList() {
  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

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
          setFilteredMovies(data.movies); // initially show all movies
        } else {
          throw new Error("Invalid Data Format");
        }
      })
      .catch(err => setError(err.message));
  }, []);

  function handleDelete(id) {
    const newMovie = movies.filter(movie => movie.id !== id);
    setMovies(newMovie);
    setFilteredMovies(newMovie.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase())));
  }

  function handleSearch(e) {
    const query = e.target.value;
    setSearch(query);

    if (query === '') {
      setFilteredMovies(movies);
    } else {
      // Simulate AI search by filtering movie titles (case-insensitive)
      const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(results);
    }
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
              height: '100vh',
            }}
          >
            <img
              src="https://media1.tenor.com/m/1No9rO6uaZsAAAAC/xm-loader-xcelerate-media.gif"
              alt="loading" style={{width:"50px",height:"50px"}}
            />
          </div>
        )}
        {error && <p>{error}</p>}
      </>
    );
  }

  const movieList = filteredMovies.map(movie => (
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
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={handleSearch}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      {movieList.length > 0 ? movieList : <p style={{ textAlign: 'center' }}>No movies found</p>}
    </>
  );
}

export default MovieList;
