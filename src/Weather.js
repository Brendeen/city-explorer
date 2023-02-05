import React from "react";
import { Container } from "react-bootstrap";

class Weather extends React.Component {
  render() {
    return (
      <Container className="weatherContainer">
        {this.props.weatherDay.map((day, index) => (
          <div id="weatherDiv" key={index}>
            <p>Date: {day.date}</p>
            <p>Weather description: {day.description}</p>
          </div>
        ))}
      </Container>
    )
  }
}

export default Weather;