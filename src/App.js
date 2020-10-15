import React ,{useState} from 'react';
import './App.css';


const api = {
  key:"d5471cc28993854bf65bcab02592b6b0",
  base : "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter")
    {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp >16) ? 'app-warm' : 'app-cool') : 'app'}>
      <main>
        <div className="container">
          <h1>Current Weather Report Application</h1>
        </div>
        <div className="search-box">
          <input type="text" 
                 className="search-bar"
                 placeholder="Enter city name.."
                 onChange={e => setQuery(e.target.value)}
                 value={query}
                 onKeyPress={search}    
          />
        </div>
        {(typeof weather.main != "undefined")?(
        <div className="location-box">
      <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
        <div className="weather-box">
          <div className="temp">
          {Math.round(weather.main.temp)} °C
          </div>
          
          <div className="weather">
            {weather.weather[0].main}
          </div>
        </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
