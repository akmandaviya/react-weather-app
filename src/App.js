import './App.css';
import Input from './components/Input';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {


  const [degrees, setDegrees] = useState(null)
  const [location, setLocation] = useState("")
  const [userLocation, setuserLocation] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("")
  const [wind, setWind] = useState(null)
  const [humidity, setHumidity] = useState("")
  const [pressure, setPressure] = useState("")
  const [feelslike, setFeelslike] = useState(null)
  const [datafetched, setDatafetched] = useState(false)


  const API_KEY= "1840908a9328393b1d73639cc7eed47f";

  const fetchData = async(e) => {
   e.preventDefault()
   try {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    const data = await res.data
    console.log(data);

    setDegrees(data.main.temp)
    setLocation(data.name)
    setDescription(data.weather[0].description)
    setIcon(data.weather[0].icon)
    setHumidity(data.main.humidity)
    setPressure(data.main.pressure)
    setWind(data.wind.speed)
    setFeelslike(data.main.feels_like)

    setDatafetched(true)
   }
   catch(erro) {
    console.log(erro)
    alert("Enter a valid location")
   }
    

  }

  const defaultDataFetched = async () => {
    if(!datafetched) {//when we havent typed anything in search bar

      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${API_KEY}&units=metric`)
      const data = await res.data
      console.log(data);
  
      setDegrees(data.main.temp)
      setLocation(data.name)
      setDescription(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setPressure(data.main.pressure)
      setWind(data.wind.speed)
      setFeelslike(data.main.feels_like)
  
    }
   
  }

  useEffect(()=>{
    defaultDataFetched()
  },[])


  return (
    <div className="App">
      <div className="weather">
        <Input 
        text = {(e) => setuserLocation(e.target.value)}
        submit ={fetchData}
        fun = {fetchData}
        />
        <div className="weather_location">
          <h3>Weather in {location}</h3>
        </div>
        <div>
          <h1 className='weather_degrees'> Temp: {degrees}°C </h1>
          <h2>Feels Like: {feelslike} °C</h2>
        </div>
         
        <div className='weather-description'>
          <div >
          <div className='weather-description-head'>
            
                <span className='weather-icon' >
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
                </span>
                <h3>{description}</h3>
                
          </div>
          <h3>Humidity: {humidity}%</h3>
          <h3>Pressure: {pressure} Pa </h3>
          <h3>Wind Speed: {wind} m/s</h3>
          </div>
          
            {/* <div className='weather_country'>
            <h3>India</h3>
            <h2 className='weather_date'>13/06/2022, 5:20:25 PM</h2>
          </div> */}

        </div>
      </div>

    </div>
  );
}

export default App;
