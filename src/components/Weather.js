import React from "react";
import WeatherDay from "./WeatherDay";

class Weather extends React.Component {
  render() {
    return (
        <div>
          {this.props.WeatherDay.map((day, idx) => {
            return (<WeatherDay
              key={idx}
              date={day.date}
              description={day.description}
            />)
          })}
        </div>
    )
  }
}

export default Weather;