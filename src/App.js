import './App.css';
import React,{useState} from 'react';
import axios from 'axios';
const api={
  key:"fa4d2b9d208db77520d0d14f6e307451",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({});
  const [weatherImg,setWeatherImg]=useState('');
  const search=evt=>{
    if(evt.key==="Enter"){
      axios(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(result=>{
        //  console.log("in fetch " +JSON.stringify(result.data))
          const respond=JSON.stringify(result.data)
         // console.log(JSON.parse(respond).main)

          setWeather(JSON.parse(respond));
          setQuery('');
          console.log("in console "+weather);
          
          if(typeof weather.main!='undefined'){
            if(weather.weather[0].main==='Clouds'){
              setWeatherImg('app');
              console.log(weather,weatherImg)
            }else if(weather.weather[0].main==='Clear'){
              setWeatherImg('warm');
              console.log(weather,weatherImg)
            }else if(weather.weather[0].main==='Haze'){
              setWeatherImg('haze');
              console.log(weather,weatherImg)
            }
          }else{
            setWeatherImg('app');
            console.log("in console "+weatherImg);
          }
        })
    }
  }
  const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day}  ${date}  ${month}  ${year}`
  }
 
  return (
    <div className={weatherImg}>
      <main>
      <div className="search-box">
        <input type="text" className="search-bar" placeholder="Search..." onChange={e=>setQuery(e.target.value)}
        value={query} onKeyPress={search} />
      </div>
      {(typeof weather.main !="undefined")?(<div>
        <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
          </div>
      </div>):('')}
      </main>
      
    </div>
  );
}

export default App;
