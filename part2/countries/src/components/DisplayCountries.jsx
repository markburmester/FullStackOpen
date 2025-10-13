import { useEffect, useState } from "react"
import axios from 'axios'


const DisplayCountries = ({array, handleShowClick, selectedCountry}) =>{
 
  if (selectedCountry){    
    const [weather, setWeather] = useState(null)
    const API_KEY = "3ab6fc12e907dad1aa52564d1147211e"
    useEffect(()=>{
        axios 
            .get("https://api.openweathermap.org/data/2.5/weather", 
                { params: { 
                    q:selectedCountry.capital[0], 
                    appid: API_KEY, 
                    units: "metric", 
                    lang: "en" }}) 
            .then((response)=>setWeather(response.data))
    }, [])


    const languages = Object.values(selectedCountry.languages)

    if (weather){
        console.log(weather)
        return(
            <div>
        <h1>{selectedCountry.name.common}</h1>
          <p>
            {selectedCountry.capital[0]} <br></br>
            Area {selectedCountry.area}
          </p>
        <h2>Languages</h2>
          <ul>
            {languages.map((x)=><li key={x}>{x}</li>)}
          </ul>
          <img src={selectedCountry.flags.png}></img>
        <h2>Weather in {selectedCountry.capital[0]}</h2>
        <p>Temperature {weather.main.temp}º Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>Wind {weather.wind.speed}m/s</p>
      </div>
        )
    }

    return(
      <div>
        <h1>{selectedCountry.name.common}</h1>
          <p>
            {selectedCountry.capital[0]} <br></br>
            Area {selectedCountry.area}
          </p>
        <h2>Languages</h2>
          <ul>
            {languages.map((x)=><li key={x}>{x}</li>)}
          </ul>
          <img src={selectedCountry.flags.png}></img>
        
      </div>
    )

  }
  else if(array.length <= 10){
    return(
      array.map((x)=>
        <div key={x.name.common}>
          {x.name.common} <button onClick={()=>handleShowClick(x)}>Show</button>
        </div>   
    ))
  }
  else{
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
}

export default DisplayCountries