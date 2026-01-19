import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  const selectCountry = (country) => {
    setSelectedCountry(country)
  }

  const clearCountry = () => {
    setSelectedCountry(null)
  }

  useEffect(() => {
    if (!selectedCountry || !selectedCountry.capital) {
      setWeather(null)
      return
    }

    const API_KEY = import.meta.env.VITE_SOME_KEY

    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: selectedCountry.capital[0],
          appid: API_KEY,
          units: "metric",
          lang: "en"
        }
      })
      .then((response) => setWeather(response.data))
      .catch(() => setWeather(null))
  }, [selectedCountry])

  const languages = selectedCountry?.languages 
    ? Object.values(selectedCountry.languages) 
    : []

  const name = selectedCountry?.name?.common || ''
  const capital = selectedCountry?.capital?.[0] || ''
  const area = selectedCountry?.area || 0
  const flag = selectedCountry?.flags?.png || ''

  return {
    country: selectedCountry,
    languages,
    name,
    capital,
    area,
    flag,
    weather,
    selectCountry,
    clearCountry
  }
}
