import React from "react";
import Movie from "./Movie";

class Movies extends React.Component {
  render() {
    console.log(this.props.movieNum.image_url)
    return (
      <div>
        {this.props.movieNum.map((movie, idx) => {
          return (<Movie
          key={idx}
          movieTitle={movie.title}
          movieImg={`https://image.tmdb.org/t/p/original/${movie.image_url}`}
          movieDescription={movie.overview}
            />)
        })}
      </div>
    )
  }
}

export default Movies;