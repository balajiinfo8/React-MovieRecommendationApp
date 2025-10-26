import PropTypes from 'prop-types';

function MovieCard({ id, image, title, price, payment, rating, onDelete, onEdit }) {
  return (
    <div className='movie'>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <h2>{price}</h2>
      <h1>{payment}</h1>
      <span>{rating}</span><br />
      <button onClick={onEdit} style={{ marginRight: 8 }}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  payment: PropTypes.string.isRequired,
  rating: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default MovieCard;
