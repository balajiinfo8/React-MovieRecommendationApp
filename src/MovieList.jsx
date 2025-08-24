import { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Must from './assets/Musk.jpg';
import Hacking from './assets/Hacking.jpg';
import IronMan from './assets/IronMan.jpg';
import IronMan2 from './assets/Iron Man.jpg';
import Pursuite from './assets/Pursuit.jpg';

function MovieList() {
  const [query, setQuery] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState('');

  const movies = [
    { id: 1, image: Must, title: "Iron Musk", rating: "5.4/5.5" },
    { id: 2, image: Hacking, title: "Ethical World", rating: "5.5/5.5" },
    { id: 3, image: Pursuite, title: "Pursuit of Happyness", rating: "5.0/5.5" },
    { id: 4, image: IronMan, title: "Iron Man", rating: "5.5/5.5" },
    { id: 5, image: IronMan2, title: "Iron Man 2", rating: "5.5/5.5" },
  ];

  movies.sort((x, y) => parseFloat(y.rating) - parseFloat(x.rating));

  const fetchAISuggestions = async () => {
    if (!query) {
      setAiSuggestions("Please enter a movie name first.");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/recommend/", { query });
      setAiSuggestions(res.data.suggestions);
    } catch (error) {
      console.error(error);
      setAiSuggestions("Error fetching AI suggestions.");
    }
  };

  return (
    <div>
      {movies.map(movie => (
        <MovieCard key={movie.id} title={movie.title} rating={movie.rating} image={movie.image} />
      ))}

      <div style={{ marginTop: '20px' }}>
        <h3>Get AI Recommendations</h3>
        <input
          type="text"
          placeholder="Enter a movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={fetchAISuggestions} style={{ padding: '8px' }}>
          Search
        </button>

        {aiSuggestions && (
          <div style={{ marginTop: '10px', whiteSpace: 'pre-line' }}>
            <strong>AI Suggestions:</strong>
            <p>{aiSuggestions}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieList;
