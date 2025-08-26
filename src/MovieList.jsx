import MovieCard from './MovieCard';
import 'typeface-roboto';
import { useEffect, useState } from 'react';
function MovieList(){

    const [movies , setMovies] = useState(null);
    
// sort 
    // movies.sort((x,y) => x.price - y.price)


    useEffect(() => {
        console.log("Use Effecct Called");
        console.log(movies);

        // get the response 
        fetch("http://localhost:3000/movies")
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
