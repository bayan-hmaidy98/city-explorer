import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



class Weather extends React.Component {



    render() {
        return (
           <div>
            {this.props.showWeather &&
           <ul>
                <li>
                    {this.props.weatherData[0].valid_date} <br />
                    {this.props.weatherData[0].description}
                </li>

                <li>
                    {this.props.weatherData[1].valid_date} <br />
                    {this.props.weatherData[1].description}
                </li>
                <li>
                    {this.props.weatherData[2].valid_date} <br />
                    {this.props.weatherData[2].description}
                </li>
            </ul>
            }
            </div>
        )
    }
}


export default Weather;