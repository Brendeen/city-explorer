import React from "react";
import Error from "./Error";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import Weather from "./Weather";
import Alert from 'react-bootstrap/Alert';
import Movie from "./Movie";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayInfo: false,
      city: '',
      cityData: {},
      movieNum: [],
      locationData: [],
      weatherDay: [],
      errorData: false,
      cityMapUrl: '',


    }
  }

  handleSearchInput = e => {
    let cityName = e.target.value;
    this.setState({
      city: cityName
    },

    )
  }

  displaySearch = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`;




      let response = await axios.get(url);

      let url2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=9`;
      console.log(response.data[0]);

      this.getWeather(response.data[0].lat, response.data[0].lon);
      this.getMovie()

      this.setState({
        displayInfo: true,
        cityData: response.data[0],
        cityMapUrl: url2,
      })
    }
    catch (error) {
      this.errorModal(error);
    }
  }

  getWeather = async (lat, lon) => {
    try {
      const url3 = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`;
      const response = await axios.get(url3);
      this.setState({
        weatherDay: response.data
      })
    }
    catch (error) {
      return (
        <>

          <Alert variant="primary">
            No extra data on this city.
          </Alert>

        </>
      );
    }
  }

  getMovie = async () => {
    try {
      const url4 = `${process.env.REACT_APP_SERVER}/movies?query=${this.state.city}`;
      console.log(url4)
      const response2 = await axios.get(url4);
      this.setState({
        movieNum: response2.data
      })
    }
    catch (error) {
      return (
        <>

          <Alert variant="primary">
            No extra data on this city.
          </Alert>

        </>
      );
    }
  }
  
  closeModal = () => {
    this.setState({
      errorData: false
    })
  }

  errorModal = (error) => {
    this.setState({
      errorData: true
    })

  }

  render() {
    console.log(this.state.weatherDay)
    return (
      <main>
        <Container className="Form">
          <Form>
            <Form.Group>
              <Form.Label>Enter City</Form.Label>
              <Form.Control type="text" placeholder="city name here" onInput={this.handleSearchInput} />
            </Form.Group>
            <Button onClick={this.displaySearch}>Explore!</Button>
          </Form>
        </Container>

        {this.state.displayInfo &&
          <>
            <h2>{this.state.cityData.display_name}</h2>
            <p>Lat:{this.state.cityData.lat}  Lon:{this.state.cityData.lon}</p>
            <img id="image" src={this.state.cityMapUrl} alt={this.state.cityData.display_name} />
          </>
        }
        <Error errorData={this.state.errorData} closeModal={this.closeModal} />
        <Weather weatherDay={this.state.weatherDay} />
        <Movie movieNum={this.state.movieNum} />
      </main>
    )
  }
}

export default Main;
