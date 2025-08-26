import MovieCard from './MovieCard';
import 'typeface-roboto';
import { useEffect, useState } from 'react';
function MovieList(){

    const [movies , setMovies] = useState([
    {
        "id": "1",
        "image": "http://localhost:3000/assets/Musk.jpg",
        "title": "Iron Musk",
        "price": 400,
        "payment": "$ or ₹",
        "rating": "5.4⭐/5.5⭐"
    },
    {
        "id": "2",
        "image": "http://localhost:3000/assets/Hacking.jpg",
        "title": "Ethical World",
        "price": 300,
        "payment": "$ or ₹",
        "rating": "5.5⭐/5.5⭐"
    },
    {
        "id": "3",
        "image": "http://localhost:3000/assets/Pursuit.jpg",
        "title": "pursuit of happyness",
        "price": 400,
        "payment": "$ or ₹",
        "rating": "5.0⭐/5.5⭐"
    },
    {
        "id": "4",
        "image": "http://localhost:3000/assets/IronMan.jpg",
        "title": "Iron Man",
        "price": 400,
        "payment": "$ or ₹",
        "rating": "5.5⭐/5.5⭐"
    },
    {
        "id": "5",
        "image": "http://localhost:3000/assets/Iron Man.jpg",
        "title": "Iron Man 2",
        "price": 500,
        "payment": "$ or ₹",
        "rating": "5.5⭐/5.5⭐"
    },
    {
        "id": "8",
        "image": "http://localhost:3000/assets/whoami.jpg",
        "title": "WhoAmI",
        "price": 10000,
        "payment": "$ or ₹",
        "rating": "5.5⭐/5.5⭐"
    }
]);
    
// sort 
    // movies.sort((x,y) => x.price - y.price)


    useEffect(() => {
        console.log("Use Effecct Called");
        console.log(movies);

        // get the response 
        fetch("https://jsonplaceholder.typicode.com/posts")
        // return the response 
        .then(response => {
            console.log(response);
            return response.json();
        }).then(data => setMovies(data));
    },[])


    function handleDelete(id) {
        const newMovie = movies.filter((movies) => movies.id != id);
        setMovies(newMovie);
    }


    if(!movies){
        return <></>
    }



    const movieList = movies.map(
        movie =>(
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
            ))

    return (
       <>
        
        <h1 style={{textAlign: 'center' , fontFamily : 'sans-serif'}}>Netflix Clone</h1>
         {movieList}
       </>
    );  
}

export default MovieList;
