import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Subheader from 'material-ui/Subheader';
import Search from './Search';
import Filtering from './Filtering';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteId: [],
      favorites: [],
      movies: this.props.results
    };
  }

  getFavoriteIcon(movie) {
    var arr = this.state.favoriteId;
    return (
      <IconButton onClick={()=>{
        this.addFavorites(movie);
      }}>
        {movie.imdbID in this.state.favoriteId ?
          <Favorite color="white" /> :
          <FavoriteBorder color="white" />
        }
      </IconButton>
    );
  }

  searchToServer() {
    var searchInput = document.getElementById('text-field').value;
    console.log(searchInput);
    $.ajax({
      url: '/search',
      method: 'GET',
      data: {value: searchInput},
      dataType: 'json',
      contentType: 'text/plain',
      success: (results) => {
        // console.log(this.props, '@@@');
        console.log('*********** results ', results);
        // console.log(this.state.movies, 'before');

        // this.setState({movies: this.state.movies.concat(results)});
        this.setState({
          movies: results
        });

        // console.log(this.state.movies, '@#$#@$#@');
        // this.render();
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  addFavorites(movie) {
    $.ajax({
      method: 'POST',
      url: '/api/profiles/addfavorites',
      data: movie,
      success: (user) => {
        // user = JSON.parse(user);
        console.log('********* success favorites updated for user ' + user);
      },
      error: (error) => {
        console.log('************* error updating favorites for user', error);
      }
    });
  }

  // getFavorites(callback) {
  //   $.ajax({
  //     url: '/api/profiles/getfavorites',
  //     method: 'GET',
  //     dataType: 'json',
  //     success: (results) => {
  //       callback(results.favorites);
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  render() {
    // console.log(this.state.movies, '10000')
    return (
      <div className='gridRoot container'>
        <div className='row'>
          <div className='col-6'>
            <Search searchToServer={this.searchToServer.bind(this)}/>
          </div>
          <div className='col-6'>
            <Filtering />
          </div>
        </div>
        <GridList cellHeight={200} cols={5} className='gridList'>
          <Subheader>Popular Movies</Subheader>
          {(this.state.movies).map((movie, i) => (
            <GridTile
              key={i}
              subtitle={<span>by <b>{movie.directors}</b></span>}
              title={movie.title}
              actionIcon = {this.getFavoriteIcon(movie)}
            >
              <a href = {movie.website} target = "_blank">
                <img src = {movie.poster}/>
              </a>
            </GridTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Results;
