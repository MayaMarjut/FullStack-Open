import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const SingleCountry = ({countryData}) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        if (!countryData?.capital?.[0]) {
            return
        }

        weatherService
            .getWeather(countryData.capital)
            .then(returnedWeatherData => {
                setWeather(returnedWeatherData)
            })
    }, [countryData])

    if (!countryData?.name?.common) {
        return null
    }

    if (!weather?.main?.temp) {
        return null
    }

    return (
        <>
            <h1>{countryData.name.common}</h1>
            <dl>
                <dt>Capital:</dt>
                <dd>{countryData.capital}</dd>
                <dt>Area:</dt>
                <dd>{countryData.area}</dd>
            </dl>
            <h2>Languages</h2>
            <ul>
                {Object.values(countryData.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img src={countryData.flags.png} alt={countryData.flags.alt}></img>
            <h2>Weather in {countryData.capital?.[0]}</h2>
            <p>Temperature {weather.main?.temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt={`${weather.weather?.[0].main}`}/>
            <p>Wind {weather.wind.speed} m/s</p>
        </>
    )
}

export default SingleCountry;