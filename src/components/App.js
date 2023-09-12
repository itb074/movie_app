import React from "react";
//import {connect} from 'react-redux';
//import {data} from '../data';
import Navbar from "./Navbar";
import MovieCard from './MovieCard';
import { addMovies ,setShowFavourites} from "../actions";
import {data as movielist } from '../data';

import { connect } from "../index";
class App extends React.Component {
   
       componentDidMount(){
        // this.props.store.subscribe(()=>
        
        //   this.forceUpdate()
        // );
        //make api call
        //dispatch action
        // this.props.store.dispatch({
        //   type:'ADD_MOVIES',
        //   movies:data
        // });
       this.props.dispatch(addMovies(movielist));
       // console.log('State',this.props.store.getState());
       }
     isMovieFavourite = (movie) => {
      const {movies}=this.props;

      const index = movies.favourites.indexOf(movie);

      if(index!==-1){
        return true;
      }
      return false;
     }
  onChangeTab=(val)=>{
    this.props.dispatch(setShowFavourites(val));
  };
  render(){
    const {movies,search}=this.props;
    console.log('movies',movies);
    const {list,favourites=[],showFavourites=[]}=movies;// {movies:{},serach:{}}

    //console.log('render',this.props.store.getState());

    const displayMovies=showFavourites?favourites:list;

    
  return (
    <div className="App">
      <Navbar  search={search}/>
      <div className="main">
           <div className="tabs">
            <div className={`tab ${showFavourites ? '':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites? 'active-tabs' : ''}`} onClick={()=>this.onChangeTab(true)}>Favourites</div>
            </div>
            
            <div id="list">
              {displayMovies.map(movie=>(
                <MovieCard 
                movie={movie} 
                key={movies.imdbID} 
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
                />
               ))}
           

            {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to dispaly!</div>)
            :null}
             </div>
           </div>
      
    </div>
  );
 }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }


function mapStateToprops(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedAppComponent = connect(mapStateToprops)(App);
export default connectedAppComponent;
