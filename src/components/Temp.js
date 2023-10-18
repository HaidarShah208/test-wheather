import React, { useEffect, useState } from 'react'
import './style.css'
import WeatherCard from './WeatherCard';

function Temp() {
    const [searchValue,setSearchValue]=useState('lahore')
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo=async()=>{
       try{
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=eaad8435b678204abb44eddf8c50e356`;
         
        const res=await fetch(url)
        const data=await res.json()
        
        const { temp, humidity, pressure } = data.main;
        const { main: weathermood } = data.weather[0];
        const { name } = data;
        const { speed } = data.wind;
        const { country, sunset } = data.sys;

        const myNewWeatherInfo = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset,
          };

          setTempInfo(myNewWeatherInfo);
           }catch(error){
            console.log(error)
        }

    }

    useEffect(()=>{
        getWeatherInfo()
    },[])
  return (
    <div>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder='search city name' id='search' autoFocus  className='searchTerm' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                <button type='button' className='searchButton' onClick={getWeatherInfo}>search</button>
            </div>
        </div>
<WeatherCard tempInfo={tempInfo}/>
    </div>
    
  )
}

export default Temp