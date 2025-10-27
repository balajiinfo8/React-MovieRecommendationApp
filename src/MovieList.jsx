import MovieCard from './MovieCard';
import 'typeface-roboto';
import { useEffect, useState } from 'react';

const initialForm = { title: '', price: '', payment: '', rating: '', image: '' };

function MovieList() {
  const [movies, setMovies] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  // Fetch initial data once
  useEffect(() => {
    fetch("https://api.jsonsilo.com/public/31707bac-e12c-420d-99f5-3c6f57d6a25f")
      .then(response => {
        if (!response.ok) throw new Error("Couldn't fetch data");
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.movies)) {
          setMovies(data.movies);
          setFilteredMovies(data.movies);
        } else {
          throw new Error("Invalid Data Format");
        }
      })
      .catch(err => setError(err.message));
  }, []);

  // Helpers
  function applyFilter(list, query) {
    if (!query) return list;
    return list.filter(m => (m.title || '').toLowerCase().includes(query.toLowerCase()));
  }

  // Delete
  function handleDelete(id) {
    const updated = (movies || []).filter(m => m.id !== id);
    setMovies(updated);
    setFilteredMovies(applyFilter(updated, search));
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

  // Create/Update submit
  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      title: form.title.trim() || 'Untitled',
      price: Number(form.price) || 0,
      payment: form.payment.trim() || 'UPI',
      rating: form.rating.trim(),
      image: form.image.trim(),
    };

    if (editingId) {
      // Update immutably with map
      const updated = (movies || []).map(m => (m.id === editingId ? { ...m, ...payload } : m));
      setMovies(updated);
      setFilteredMovies(applyFilter(updated, search));
      setEditingId(null);
    } else {
      // Create new record
      const newMovie = {
        id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()),
        ...payload,
      };
      const updated = [newMovie, ...(movies || [])];
      setMovies(updated);
      setFilteredMovies(applyFilter(updated, search));
    }

    setForm(initialForm);
  }

  // Start editing: prefill form
  function onEdit(movie) {
    setEditingId(movie.id);
    setForm({
      title: movie.title ?? '',
      price: String(movie.price ?? ''),
      payment: movie.payment ?? '',
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
        {error && <p>{error}</p>}
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
      payment={movie.payment}
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
        <input name="payment" value={form.payment} onChange={handleFormChange} placeholder="Payment (e.g., UPI)" />
        <input name="rating" value={form.rating} onChange={handleFormChange} placeholder="Rating" />
        <input name="image" value={form.image} onChange={handleFormChange} placeholder="Image URL" />
        <div>
          <button type="submit" style={{ marginRight: 8 }}>{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" onClick={onCancelEdit}>Cancel</button>}
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
