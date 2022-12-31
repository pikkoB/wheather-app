import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios';


function App() {
  const [count, setCount] = useState(0)

  const [wheather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true)

  useEffect(() => {

    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=e2d401951df79f1e74c507bd614cd602`)
        .then(res => setWeather(res.data))
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  console.log(wheather)

  const celsius =  Math.round(wheather.main?.temp - 278)
  const fahrenheit = (celsius * 1.8) + 32
  console.log(celsius)

  const changeUnit = () => {
    setIsCelsius(!isCelsius);
  }

  return (
    <div className="App">
      <div className='card'>
        <h1>Wheather App</h1>
        <h3>{wheather.weather?.[0].description}</h3>
        <h3>{wheather.name}{" - "}{wheather.sys?.country} </h3>
        <div>
          <img src={`http://openweathermap.org/img/wn/${wheather.weather?.[0].icon}@2x.png`} alt="" />
          <p>Wind speed: <span>{wheather.wind?.speed} m/s </span></p>
        </div>
        <p>Temp <span> {isCelsius ? celsius : fahrenheit} {isCelsius ? "°C" : "°F"} </span> </p>
        <button onClick={changeUnit}>Degree °F/°C</button>
      </div>
    </div>
  )
}

export default App
