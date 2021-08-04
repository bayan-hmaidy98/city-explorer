
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Weather from './components/weather';


export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locationData: {},
      errorMsg: '',
      displayMap: false,
      displayWeather: false,
      weatherData: []
    }
  };

  cityEntered = async (event) => {
    event.preventDefault();
console.log('Hello');
    try {
      const city = event.target.cityName.value;
      const serverResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${city}&format=json`);
      const locData = serverResponse.data[0];
      const cityModified = serverResponse.data[0].display_name.split(',')[0];
      let weatherData = await axios.get(`${process.env.REACT_APP_URL}/weather?searchQuery=${cityModified}&lon=${locData.lon}&${locData.lat}`);

      console.log(weatherData);
      this.setState({
        locationData: locData,
        errorMsg: '',

        weatherData: weatherData.data,
        displayMap: true
      });
    } catch (error) {
      this.setState({
        errorMsg: error.message,
        displayMap: false,
        displayWeather: false
      });

    }


  };


  render() {
    return (
      <div id="container">
        <Form onSubmit={this.cityEntered}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ padding: '20px 15px' }} >City Name</Form.Label>
            <Form.Control type="text" placeholder="Enter city name" name="cityName" style={{ width: '50%' }} />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ background: '#BEE5EC' }}>
            Explore!
          </Button>
        </Form> <br />
        <div>
          <img style={{ border: '5px solid #555' }} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&q&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=15`} alt='Location' />
          {
            this.state.locationData.display_name && (
              <p>
                <p>City: {this.state.locationData.display_name}</p>
                <p>Longitude: {this.state.locationData.lon}</p>
                <p>Latitude: {this.state.locationData.lat}</p>
              </p>
            )}
        </div>

        <div>
          <Weather
            weatherData={this.state.weatherData}
            // displayWeather={this.state.displayWeather}
          />
        </div>
      </div>
    )
  }
}

export default App
