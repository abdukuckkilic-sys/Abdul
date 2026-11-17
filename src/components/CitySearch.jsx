import { useState } from "react"


export default function CitySearch({ setCityData }) {

    const API_url = import.meta.env.VITE_WEATHER_URL
    const API_key = import.meta.env.VITE_API_KEY

    const [places, setPlaces] = useState([])
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    // VITE_WEATHER_URL
    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.target
        const formData = new FormData(form)
        const city = formData.get("city").trim() //Trim får den til at Fjerne mellemrum

        setPlaces([])
        setMessage("")
        setCityData(null)

        // tomt input
        if (city === "") {
            setMessage("Skriv et bynavn først")
            return
        }

        setLoading(true)


        try {
            const url = new URL(API_url)
            url.searchParams.set("q", city + ",DK") // DK = kun Danmark
            url.searchParams.set("limit", 1)
            url.searchParams.set("appid", API_key)

            const respons = await fetch(url)


            if (!respons.ok) {
                throw new Error("API fejl")
            }

            const data = await respons.json()

            // tom liste = byen findes ikke
            if (data.length === 0) {
                setMessage("Ingen by fundet")
                return
            }

            setCityData(data[0]) // sender data op til App

        } catch (error) {
            console.log(error)
            setMessage("Noget gik galt, prøv igen")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section>
            <form className="search" onSubmit={handleSubmit}>
                <input type="text" name="city" placeholder="Skriv en by" />
                <button type="submit">Søg</button>
            </form>

            {loading && <p>Søger efter by...</p>}
            {message && <p>{message}</p>}
        </section>
    )
}
