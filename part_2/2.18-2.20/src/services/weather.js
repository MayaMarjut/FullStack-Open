const api_key = import.meta.env.VITE_SOME_KEY

import axios from 'axios'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeather = (capital) => {
    const request = axios.get(`${weatherUrl}?q=${capital}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}

export default { getWeather }