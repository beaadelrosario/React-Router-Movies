import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch , Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import Movielist from './Movies/MovieList'
import Movie from './Movies/Movie'

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
    let x = []
    let y = movieList.find(movieItem=>{
      return movieItem.id == id
    })
    x.push(y)
    setSaved(y)
  };

  return (
    // add Switch instead of div?
    <div> 
      <SavedList list={[ saved ]} />

    <Switch>
      <Route path='/movies/:itemId'>
        <Movie movies={movieList} addToSavedList={addToSavedList}/>
      </Route>

      <Route path='/'>
        <Movielist movies={movieList}/>
            {/* **This component will need the movies injected into it via props**. */}
      </Route>
    </Switch>
    </div>
  );
};

export default App;
