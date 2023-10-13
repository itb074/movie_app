
// {
//     type: 'ADD_MOVIES',
//      movies:[m1,m2,m3]

// }
// {
//     type:'DECREASE_COUNT'
// }
//action types
export const ADD_MOVIES='ADD_MOVIES';

export const ADD_TO_FAVOURITES='ADD_TO_FAVOURITES';

export const REMOVE_FROM_FAVOURITES='REMOVE_FROM_FAVOURITES';

export const SET_SHOW_FAVOURITES='SET_SHOW_FAVOURITES';

export const ADD_MOVIE_TO_LIST='ADD_MOVIE_TO_LIST';

export const ADD_SEARCH_RESULT='ADD_SEARCH_RESULT';


//action creater
export function addMovies (movies){
    return {
        type:ADD_MOVIES,
        movies
    }
}

export function addFavourite (movie){
    return {
        type:ADD_TO_FAVOURITES,
        movie
    }
}

export function removeFromFavourites(movie){
    return {
        type:REMOVE_FROM_FAVOURITES,
        movie
    };
}

export function setShowFavourites (val){
    return {
        type:SET_SHOW_FAVOURITES,
        val
    }
}
export function addMovietoList (movie){
    return {
        type:ADD_MOVIE_TO_LIST,
        movie
    }
}

export function handleMovieSearch (searchText) {

  
return function(dispatch){
    const url=`https://www.omdbapi.com/?apikey=3ca5df7&t=${searchText}`;
    fetch(url)
    .then (response=>response.json())
    .then (movie => {
      console.log('movie',movie)
        // dispatch an action
        dispatch(addMoviesSearchResult(movie));

       })
    }
}

export function addMoviesSearchResult (movie) {
    return{
        type:ADD_SEARCH_RESULT,
        movie
    }
}
