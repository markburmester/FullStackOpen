import {useEffect, useState} from 'react'
import axios from "axios";
import DisplayCountries from './components/DisplayCountries';


function App() {
  

  const [countries, setCountries] = useState([])
  
  const [searchedCountries, setSearchedCountries] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
    
  
  useEffect(()=> {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(
        (response) => {
          setCountries(()=> (response.data))
          setSearchedCountries(()=> (response.data))
          
          
        }
    )
      
    
    
  }, []);

  console.log(countries)
 

  const handleSearchChange = (event) =>{
    event.preventDefault()
    setSearchValue(event.target.value)
    const filtered = countries.filter((x)=>x.name.common.toLowerCase().includes(event.target.value))
    setSearchedCountries(filtered)  
    if (filtered.length===1){setSelectedCountry(filtered[0])}  
    else{setSelectedCountry(null)}
    
  }

  const handleShowClick = (x) =>{
    setSelectedCountry(x)  
  }
  
  return (
    <div>
      <form>
        find countries <input value={searchValue} onChange={handleSearchChange}/>
      </form>
      <DisplayCountries array={searchedCountries} handleShowClick={handleShowClick} selectedCountry={selectedCountry}/>
    </div>
  )
}

export default App
