import React, {Component} from 'react';
import Form from './comp/Form';
import Weather from './comp/Weather';

const API_KEY = "a6e1b33e6bb8ff31f1202518e51700f2";
// https://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=e36ed364400282e43250b6c4c0274d44
class App extends Component {

  state = {
    tempreature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: '',
  }

getWeather = async (e) =>{
  e.preventDefault()
  
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;

  const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
  const data = await api.json();
  // console.log(data);

  if(city && country){
    this.setState({
      tempreature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: '',
    })
  }
  else{
    this.setState({
      tempreature: '',
      city: '',
      country: '',
      humidity: '',
      description: '',
      error: 'Please inter Country',
    })
  }
}


  render() {
  return (
    <>
    <div className='wrapper'>
      <div className='form-container'>
    <Form getWeather={this.getWeather}/>
    <Weather 
            tempreature= {this.state.tempreature}
            city= {this.state.city}
            country= {this.state.country}
            humidity= {this.state.humidity}
            description= {this.state.description}
            error= {this.state.error}
    />
      </div>
    </div>
    </>
  );
}
}

export default App;
