/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './styles/MovieInput.css';


// MovieInput component, state to handle film search and send fetch request to API
class MovieInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieInput: '',
    };
    this.handleOnMovieChange = this.handleOnMovieChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // updating state with movie input
  handleOnMovieChange(e) {
    this.setState({
      movieInput: e.target.value,
    });
  };

  // on button click, fetch request sent to API using movie input set to state
  handleSubmit() {
    fetch(`/movie/?title=${this.state.movieInput}`)
      .then((res) => res.json())
      .then((data) => this.props.onResponse(data));
  };

  // rendering input field to search film 
  render() {
    return (
      <div id="movie-input-container">
        <div id="movie-input-title">Find A Film</div>
        <div id="movie-input">
          <input
            type="text"
            onChange={this.handleOnMovieChange}
            value={this.state.movieInput}
          />
          <button onClick={this.handleSubmit}>Search</button>
        </div>
      </div>
    );
  }
}

export default MovieInput;
