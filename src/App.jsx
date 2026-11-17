import { useState } from 'react'
import CitySearch from './components/CitySearch'
import WeatherDisplay from './components/WeatherDisplay';


function App() {
  const [cityData, setCityData] = useState(null)
  console.log(cityData);


  return (
    <>
      <h1>vejr app</h1>
      <CitySearch setCityData={setCityData} />
      <WeatherDisplay cityData={cityData} />
    </>
  )
}

export default App
