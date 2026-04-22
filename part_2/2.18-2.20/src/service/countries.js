import axios from 'axios'
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/'


const getCountries = () => {
    const request = axios.get(`${countriesUrl}/api/all`)
    return request.then(response => response.data.map(country => country.name.common))
}

const getSingleCountry = (name) => {
    const request = axios.get(`${countriesUrl}/api/name/${name}`)
    return request.then(response => {
        return response.data
    })
}

export default { getCountries, getSingleCountry }