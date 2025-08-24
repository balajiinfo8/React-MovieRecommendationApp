import Must from './assets/Musk.jpg';
import Hacking from './assets/Hacking.jpg';
import MovieCard from './MovieCard';
import IronMan from './assets/IronMan.jpg';
import IronMan2 from './assets/Iron Man.jpg'
import Pursuite from './assets/Pursuit.jpg';
function MovieList(){

    const movies = [
        {
            id : 1,
            image : Must,
            title : "Iron Musk",
            rating : "5.4⭐/5.5⭐",
        },
        {
             id : 2,
             image : Hacking,
            title : "Ethical World",
            rating : "5.5⭐/5.5⭐",
        },
        {
             id : 3,
             image : Pursuite,
            title : "pursuit of happyness",
            rating : "5.0⭐/5.5⭐",
        },
        {
             id : 4,
             image : IronMan,
            title : "Iron Man",
            rating : "5.5⭐/5.5⭐",
        },
        {
             id : 5,
             image : IronMan2,
            title : "Iron Man 2",
            rating : "5.5⭐/5.5⭐",
        }

    ]
// sort 
    movies.sort((x,y) => y.rating - x.rating)

    return (
       <div>
            {movies.map(movie =>(
             <MovieCard
                key={movie.id}  
                title={movie.title} 
                rating={movie.rating}
                image={movie.image}  
             />
            ))}
       </div>
    );
}

export default MovieList;
