import React from "react";
import { Container } from "react-bootstrap";

class WeatherDay extends React.Component {
  render() {
    return (
      <Container className="weatherContainer">
        <div id="weatherDiv">
          <p>{`Date: ${this.props.date}`}</p>
          <p>{`Description: ${this.props.description}`}</p>
        </div>
      </Container>
    )
  }
}

export default WeatherDay;