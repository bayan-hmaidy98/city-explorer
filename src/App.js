import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export class App extends Component {
  
  constructor (props){
    super (props)
    this.state = {
      locationData: {}
      
    }
  };

  cityEntered = async (event) => {
    event.preventDefault();
    const city = event.target.cityName.value;
    const serverResponse = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${city}&format=json`)

    this.setState ({
      locationData: serverResponse.data[0]
    
    })
    console.log(serverResponse.data[0]);
  }
  
  render() {
    return (
      <div>
        <Form onSubmit = {this.cityEntered}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name</Form.Label>
            <Form.Control type="text" placeholder="Enter city name" name="cityName" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>
        <div>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&q&center=${this.state.locationData.lat},${this.state.locationData.lon}&zoom=15`} />
        {
          this.state.locationData.display_name && (
          <p>
          <p>{this.state.locationData.display_name}</p>
          <p>{this.state.locationData.lon}</p>
          <p>{this.state.locationData.lat}</p>
          </p>
    ) }
        </div>
      </div>
    )
  }
}

export default App
