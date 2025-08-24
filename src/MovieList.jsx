import Must from './assets/Musk.jpg';
import Hacking from './assets/Hacking.jpg';
import MovieCard from './MovieCard';
import IronMan from './assets/IronMan.jpg';
import IronMan2 from './assets/Iron Man.jpg'
import Pursuite from './assets/Pursuit.jpg';
import 'typeface-roboto';
function MovieList(){

    const movies = [
        {
            id : 1,
            image : Must,
            title : "Iron Musk",
            price : "$"+400,
            rating : "5.4⭐/5.5⭐",
        },
        {
             id : 2,
             image : Hacking,
            title : "Ethical World",
            price : "$"+300,
            rating : "5.5⭐/5.5⭐",
        },
        {
             id : 3,
             image : Pursuite,
            title : "pursuit of happyness",
            price : "$"+400,
            rating : "5.0⭐/5.5⭐",
        },
        {
             id : 4,
             image : IronMan,
            title : "Iron Man",
            price : "$"+400,
            rating : "5.5⭐/5.5⭐",
        },
        {
             id : 5,
             image : IronMan2,
            title : "Iron Man 2",
            price : "$"+500,
            rating : "5.5⭐/5.5⭐",
        }

    ]
// sort 
    movies.sort((x,y) => y.price - x.price)

    return (
       <div>

        <h1 style={{textAlign: 'center' , fontFamily : 'sans-serif'}}>
            Netflix Clone
            </h1>
            {movies.map(movie =>(
             <MovieCard
                key={movie.id}  
                title={movie.title}
                price={movie.price} 
                rating={movie.rating}
                image={movie.image}  
             />
            ))}
       </div>
    );
}

export default MovieList;
