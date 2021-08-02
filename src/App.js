import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Weather from './component/weather';


export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locationData: {},
      errorMsg: '',
      displayMap: false,
      renderedLocWeatherData: [],
      showWeather: false,
      weatherErr: '',
      dspErrWeather: false,
      displarErrorMsg: false,
    }
  };

  cityEntered = async (event) => {
    event.preventDefault();
   

      const city = event.target.cityName.value;
      const serverResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${city}&format=json`);
      let weatherData = `${process.env.REACT_APP_URL}/weather?searchQuery=${city}`;
      try {
        let locResult = await axios.get(serverResponse);
      this.setState({
        locationData: serverResponse.data[0],
        errorMsg: '',
      });
    } catch (error) {
      this.setState({
        errorMsg: error.message,
        displarErrorMsg: 'sorry , Error in response !!',
        errorMsg: true,
      });
      
    }
    try {
      let locWeatherData = await axios.get(weatherData);
      if (locWeatherData.data !== undefined) {
        this.setState({
          renderedLocWeatherData: locWeatherData.data,
          showWeather: true,
          dspErrWeather: false,
        })
      }
    }
    catch {
      this.setState({
        weatherErr: 'sorry , no weather data availabe for your location',
        showWeather: false,
        dspErrWeather: true

      })

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
          <img style={{ border: '5px solid #555' }} src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&q&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=15`} alt = 'Location'/>
          {
            this.state.locationData.display_name && (
              <p>
                <p>City: {this.state.locationData.display_name}</p>
                <p>Longitude: {this.state.locationData.lon}</p>
                <p>Latitude: {this.state.locationData.lat}</p>
              </p>
            )}
        </div>
        {this.state.displarErrorMsg && <p>{this.state.errorMsg}</p>}
        {this.state.showWeather &&
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>date</th>
                <th>description</th>
              </tr>
            </thead>
            {this.state.renderedLocWeatherData.map((element) => {
              return (<Weather
                description={element.description}
                date={element.date}
              />
              )
            })}
          </Table>
        }
      </div>
    )
  }
}

export default App
