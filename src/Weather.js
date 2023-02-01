import React from "react";

class Weather extends React.Component {
  render(){
    console.log(this.props.weatherDay.date)
    return(
      this.props.weatherDay.map((day, index)=> (
        <div key={index}>
        <p>Date: {day.date}</p>
        <p>Weather description: {day.description}</p>
        </div>
      ))
    
    )
  }
}

export default Weather;