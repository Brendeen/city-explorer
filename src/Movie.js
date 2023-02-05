import React from "react";
import { Container } from "react-bootstrap";

class Movie extends React.Component {
  render() {
    console.log(this.props.movieNum.image_url)
    return (
      <Container className="movieContainer">
        {this.props.movieNum.map((movie, index) => (
          <div id="movieDiv" key={index}>
            <h3>{movie.title}</h3>
            <img id="cardImg" src={`https://image.tmdb.org/t/p/original/${movie.image_url}`} alt={movie.title}/>
            <p>{movie.overview}</p>
          </div>
        ))}
      </Container>

    )
  }
}

export default Movie;