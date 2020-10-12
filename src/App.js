import React from 'react';
import './App.css';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';

const dotenv = require('dotenv')
dotenv.config()



const api_key = process.env.REACT_APP_API_KEY;




class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
    
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${api_key}`);
    const data = await api_call.json();
    if (city && country) {
    console.log(data);
    
    this.setState({
      temperature: data.list[0].main.temp,
      city: data.city.name,
      country: data.city.country,
      humidity: data.list[0].main.humidity,
      description: data.list[0].weather[0].description,
      error: ''
    });
   } else {
     this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: '***Please enter you desired region***'
    });
   }
  }
  render() {
    return (
      <div>
        <Titles/>
        <Form getWeather={this.getWeather}/>
        <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        humidity={this.state.humidity}
        description={this.state.description}
        error={this.state.error}
        />
      </div>
    )
  }
};


export default App;


        
