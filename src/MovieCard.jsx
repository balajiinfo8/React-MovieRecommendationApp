import PropTypes from 'prop-types';
// import 'bootstrap/dist/css/bootstrap.min.css';
function MovieCard({ id, image, title, price,platform, rating, onDelete, onEdit }) {
  return (
    <div className='movie' > 
      <img src={image} alt={title} />
      <h3>Title : {title}</h3>
      <h2>Price : {price}</h2>
      <h2>Platform : {platform}</h2>
      <span>Rating :{rating}</span><br /> <br />
      <button onClick={onEdit} style={{ marginRight: 8 , backgroundColor : "#04AA6D" , border : "None" , color : "white" , textAlign : "center"}}>Edit</button>
      <button onClick={() => onDelete(id)} style={{ marginRight: 8 , backgroundColor : "#ff0000" , border : "None" , color : "white" , textAlign : "center"}}>Delete</button>
    </div>
  );
}

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  platform: PropTypes.string.isRequired,
  rating: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default MovieCard;
