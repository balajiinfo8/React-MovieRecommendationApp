import MovieCard from './MovieCard';
import 'typeface-roboto';
import { useEffect, useState } from 'react';
function MovieList(){

    const [movies , setMovies] = useState(null);
    
// sort 
    // movies.sort((x,y) => x.price - y.price)

    const [error,setError] = useState(null);

    useEffect(() => {
        console.log("Use Effecct Called");
        console.log(movies);


        // set time out in the fetch
        setTimeout(()=>{
        // get the response 
        fetch("http://localhost:3000/movies")
        // return the response 
        .then(response => {
            if(!response.ok) {
                throw Error("Coudn't able to throw erros");
            }
            console.log(response);
            return response.json();
        })
        .then(data => setMovies(data))
        .catch((error)=>{
            console.log(error.message);
            setError(error.message);
        })},1000)
    },[])


    function handleDelete(id) {
        const newMovie = movies.filter((movies) => movies.id != id);
        setMovies(newMovie);
    }


    if(!movies){
        return (
            <>
            {!error && <img src="data/assets/loading.gif"></img>}
            {error && <p>{error}</p>}
            </>
        )
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
