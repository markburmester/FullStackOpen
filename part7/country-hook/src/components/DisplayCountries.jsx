const DisplayCountries = ({array, handleShowClick, country: selectedCountry, languages, name, capital, area, flag, weather}) =>{
 
  if (selectedCountry){

    if (weather){
        console.log(weather)
        return(
            <div>
        <h1>{name}</h1>
          <p>
            {capital} <br></br>
            Area {area}
          </p>
        <h2>Languages</h2>
          <ul>
            {languages.map((x)=><li key={x}>{x}</li>)}
          </ul>
          <img src={flag}></img>
        <h2>Weather in {capital}</h2>
        <p>Temperature {weather.main.temp}º Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>Wind {weather.wind.speed}m/s</p>
      </div>
        )
    }

    return(
      <div>
        <h1>{name}</h1>
          <p>
            {capital} <br></br>
            Area {area}
          </p>
        <h2>Languages</h2>
          <ul>
            {languages.map((x)=><li key={x}>{x}</li>)}
          </ul>
          <img src={flag}></img>
        
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