import React from "react";
import Error from "./Error";
import Resturants from "./Resturants";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayInfo: false,
      city: '',
      cityData: {},
      restresturantData: [],
      locationData: [],
      weatherData: [],
      errorData: false
    }
  }

  handleSearchInput = e => {
    let cityName = e.target.value;
    this.setState({
      city: cityName
    },
      () => console.log(this.state.city)
    )
  }

  displaySearch = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`;

      

      // let url2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=9`;

      let responce = await axios.get(url);

      console.log(responce.data[0]);

      this.setState({
        displayInfo: true,
        cityData: responce.data[0]
      })
    }
    catch(error){
      this.errorModal(error);
    }
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
            <img id="image" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=11`} />
          </>
        }
        <Error errorData={this.state.errorData} closeModal={this.closeModal}/>
      </>
    )
  }
}

export default Main;
