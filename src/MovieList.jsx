import MovieCard from './MovieCard';
import 'typeface-roboto';
import { useEffect, useState } from 'react';

const initialForm = { title: '', price: '', platform: '', rating: '', image: '' };

function MovieList() {
  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const BASE_URL = "https://68feeb02e02b16d1753bce41.mockapi.io/flextack/movies/movies";

  // Fetch initial data once (READ)
  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        console.log("FETCHED DATA:", data);
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch(err => setError(err.message));
  }, []);

  // Helpers
  function applyFilter(list, query) {
    if (!query) return list;
    return list.filter(m => (m.title || '').toLowerCase().includes(query.toLowerCase()));
  }

  // Delete (DELETE)
  function handleDelete(id) {
    fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      const updated = (movies || []).filter(m => m.id !== id);
      setMovies(updated);
      setFilteredMovies(applyFilter(updated, search));
    })
    .catch(err => console.error("Delete error:", err));
  }

  // Search
  function handleSearch(e) {
    const q = e.target.value;
    setSearch(q);
    setFilteredMovies(applyFilter(movies || [], q));
  }

  // Form controls
  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'price' ? value.replace(/[^\d.]/g, '') : value }));
  }

  // Create/Update submit (CREATE & UPDATE)
  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title: form.title.trim() || 'Untitled',
      price: Number(form.price) || 0,
      platform: form.platform.trim() || 'Theatre',
      rating: form.rating.trim(),
      image: form.image.trim(),
    };

    if (editingId) {
      // UPDATE existing movie
      fetch(`${BASE_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      .then(res => res.json())
      .then(updatedMovie => {
        const updated = (movies || []).map(m =>
          m.id === editingId ? updatedMovie : m
        );
        setMovies(updated);
        setFilteredMovies(applyFilter(updated, search));
        setEditingId(null);
      })
      .catch(err => console.error("Update error:", err));
    } else {
      // CREATE new movie
      fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      .then(res => res.json())
      .then(newMovie => {
        const updated = [newMovie, ...(movies || [])];
        setMovies(updated);
        setFilteredMovies(applyFilter(updated, search));
      })
      .catch(err => console.error("Create error:", err));
    }

    setForm(initialForm);
  }

  // Start editing: prefill form
  function onEdit(movie) {
    setEditingId(movie.id);
    setForm({
      title: movie.title ?? '',
      price: String(movie.price ?? ''),
      platform: movie.platform ?? '',
      rating: movie.rating ?? '',
      image: movie.image ?? '',
    });
  }

  function onCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  if (!movies) {
    return (
      <>
        {!error && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <img
              src="https://media1.tenor.com/m/1No9rO6uaZsAAAAC/xm-loader-xcelerate-media.gif"
              alt="loading" style={{ width: "50px", height: "50px" }} 
            />
          </div>
        )}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      </>
    );
  }

  const movieList = (filteredMovies || []).map(movie => (
    <MovieCard
      key={movie.id}
      id={movie.id}
      image={movie.image}
      title={movie.title}
      price={movie.price}
      platform={movie.platform}
      rating={movie.rating}
      onDelete={handleDelete}
      onEdit={() => onEdit(movie)}
    />
  ));

  return (
    <>
      <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>FlixTrack</h1>

      {/* Create / Update form */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 420, margin: '0 auto 20px' }}>
        <input name="title" value={form.title} onChange={handleFormChange} placeholder="Title" required />
        <input name="price" type="number" value={form.price} onChange={handleFormChange} placeholder="Price" min="0" step="0.01" />
        
        {/* Platform dropdown */}
        <select name="platform" value={form.platform} onChange={handleFormChange} required>
          <option value="">Select Platform</option>
          <option value="Theatre">Theatre</option>
          <option value="Netflix">Netflix</option>
          <option value="Prime Video">Prime Video</option>
          <option value="JioHotstar">JioHotstar</option>
          <option value="JioCinema">JioCinema</option>
          <option value="YouTube">YouTube</option>
          <option value="telegram">Telegram</option>
        </select>

        <input name="rating" value={form.rating} onChange={handleFormChange} placeholder="Rating" />
        <input name="image" value={form.image} onChange={handleFormChange} placeholder="Image URL" />
        <div>
          <button type="submit" style={{ marginRight: 8 , backgroundColor : "#3333cc" , border : "None" , color : "white" , textAlign : "center"}}>{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" onClick={onCancelEdit} style={{ marginRight: 8 , backgroundColor : "#ff0000" , border : "None" , color : "white" , textAlign : "center"}}>Cancel</button>}
        </div>
      </form>

      {/* Search */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={handleSearch}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
      </div>

      {movieList.length > 0 ? movieList : <p style={{ textAlign: 'center' }}>No movies found</p>}
    </>
  );
}

export default MovieList;
