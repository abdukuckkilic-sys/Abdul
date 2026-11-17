import { useState } from "react"


export default function WeatherDisplay({ cityData }) {

    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const API_key = import.meta.env.VITE_WEATHER_URL
    const dataUrl = import.meta.env.VITE_WEATHER_DATA_URL

    if (!cityData) return

    const { lat, lon } = cityData[0]
    const url = new URL(API_URL)
    url.search = new URLSearchParams({ lat, lon, appid: API_KEY, units: "metric", lang: "da" })

    console.log(cityData[0]);
    console.log(lat, lon);

    async function getWeather() {
        setLoading(true)
        setError("")

        try {
            const respons = await fetch(url)

            if (!respons.ok) {
                throw new Error("API fejl")
            }

            const data = await respons.json()
            setWeatherData(data)
        } catch (err) {
            console.log(err);
            setError("kunne ikke finde vejret")
        } finally {
            setLoading(false)
        }

        getWeather()
    }

    // VITE_WEATHER_DATA_URL
    return (
        <>
            <div className="weather">
                <p className="country">Danmark</p>
                <h2>{cityData.name}</h2>
                <p className="temp">{Math.round(weatherData.main.temp)}*</p>
                <p>{weatherData.weather[0].description}</p>

                <div className="cards">
                    <div className="card">
                        <p>Føles som</p>
                        <strong>{Math.round(weatherData.main.feels_like)}*</strong>
                    </div>
                    <div className="card">
                        <p>Luftfugtighed</p>
                        <strong>{Math.round(weatherData.main.humidity)}%</strong>
                    </div>
                    <div className="card">
                        <p>Vind</p>
                        <strong>{Math.round(weatherData.main.wind.speed)}m/s</strong>
                    </div>
                    <div className="card">
                        <p>Lufttryk</p>
                        <strong>{Math.round(weatherData.main.pressure)}hPa</strong>
                    </div>
                </div>
            </div>
        </>
    )
}
