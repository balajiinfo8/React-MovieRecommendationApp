import PropTypes from 'prop-types';

function MovieCard(props)
{
    return(
        <div className='movie'>
            <img src={props.image} alt={props.name} />
            <h3>{props.title}</h3>
            <span>{props.rating}</span>
        </div>
    );
}

MovieCard.PropType = {
    title : PropTypes.string,
    rating : PropTypes.number,
}   
export default MovieCard;