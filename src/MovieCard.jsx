import PropTypes from 'prop-types';
import { useState } from 'react';

function MovieCard(props)
{   
    const [purchased,setPurchased] = useState(false);
    const [discount , setDiscount] = useState(props.price);

    function  applayDiscount(price)
    {
        console.log(props.title,"purchased with",discount,"% price discount");
        setPurchased(true);
        setDiscount(discount - price);
        console.log(purchased);
    }
    return(
        <div className='movie'>
            <img src={props.image} alt={props.name} />
            <h3>{props.title}</h3>
            <h2>{discount}</h2>
            <h1>{props.payment}</h1>
            <span>{props.rating}</span><br />
            <button onClick={(event) => applayDiscount(21,event)}>Discount</button>
            <button onClick={() =>  props.delete(props.id)}>Delete</button>
            <p>{purchased ? "Already Purchased" : "Buy with % "}</p>
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