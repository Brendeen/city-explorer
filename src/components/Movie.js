import React from "react";
import { Container } from "react-bootstrap";

class Movie extends React.Component {
  render() {
    return (
      <Container className="movieContainer">
        <div id="movieDiv">
          <h3>{this.props.movieTitle}</h3>
          <img id="cardImg" 
          src={this.props.movieImg}
          alt={this.props.movieTitle}
          />
          <p>{this.props.movieDescription}</p>
        </div>
      </Container>
    )
  }
}

export default Movie;