import React from "react";
import Error from "./Error";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import Weather from "./Weather";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayInfo: false,
      city: '',
      cityData: {},
      restresturantData: [],
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
      () => console.log(this.state.city)
      // clutters console
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

      this.setState({
        displayInfo: true,
        cityData: response.data[0],
        cityMapUrl: url2,
      })
    }
    catch(error){
      this.errorModal(error);
    }
  }

  getWeather = async (lat, lon) => {
    const url3 = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&center=${lat},${lon}&zoom=9`
    const response = await axios.get(url3);
    this.setState({
      weatherDay: response.data
    })
  }

  closeModal = () =>{
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
      <>
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
            <img id="image" src={this.state.cityMapUrl} alt={this.state.cityData.display_name}/>
          </>
        }
        <Error errorData={this.state.errorData} closeModal={this.closeModal}/>
        <Weather weatherDay={this.state.weatherDay}/>
      </>
    )
  }
}

export default Main;
