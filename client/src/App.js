import React, { useState, useEffect } from 'react';
//imports useState to set slices of state and useEffect for sid eeffects 
import axios from 'axios';
//imports library
import { Route } from 'react-router-dom';
//imports Route tell where to go,  use Switch if using  nav bar and switching pages
import SavedList from './Movies/SavedList';
import Movielist from './Movies/MovieList'
import Movie from './Movies/Movie'
//these are imports of childs of the App file importing them so they can be used

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
    // let x = []
    let chosenMovie = movieList.find(movieItem=>{
      return movieItem.id == id
    })
    setSaved(chosenMovie)
  };

  return (
    <div> 
      <SavedList list={[ saved ]} />
      {/* this is the div at the top 'header' */}

      <Route path='/movies/:itemId'>
        <Movie movies={movieList} addToSavedList={addToSavedList}/>
      </Route>

      <Route exact path='/'>
        <Movielist movies={movieList}/>
            {/* **This component will need the movies injected into it via props**. */}
      </Route>
    </div>
  );
};

export default App;
