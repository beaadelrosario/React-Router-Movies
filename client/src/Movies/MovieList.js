import React from 'react';
import { useHistory } from 'react-router-dom'

const MovieList = props => {
  const reactHistory = useHistory()

  const routeTomovie = (id)=>{
    reactHistory.push(`/movies/${id}`)
  }

  return (
    <div className="movie-list">
      {props.movies.map(movie => (
        <MovieDetails 
        key={movie.id} 
        movie={movie} 
        routeTomovie={() => {
          routeTomovie(movie.id)}}/> 
      ))}
    </div>
  );
}

function MovieDetails({ movie , routeTomovie }) {
  const { title, director, metascore } = movie;
  return (
    <div className="movie-card" onClick={routeTomovie}>
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
    </div>
  );
}

export default MovieList;
