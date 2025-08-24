import PropTypes from 'prop-types';

function MovieCard(props)
{
    return(
        <div className='movie'>
            <img src={props.image} alt={props.name} />
            <h3>{props.title}</h3>
            <h2>{props.price}</h2>
            <h1>{props.payment}</h1>
            <span>{props.rating}</span>
        </div>
    );
}

MovieCard.PropType = {
    image : PropTypes.image,
    title : PropTypes.string,
    price : PropTypes.number,
    payment : PropTypes.string,
    rating : PropTypes.string,
}   
export default MovieCard;