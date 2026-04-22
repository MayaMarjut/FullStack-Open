import axios from 'axios'
const countriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'


const getCountries = () => {
    const request = axios.get(countriesUrl)
    return request.then(response => response.data.map(country => country.name.common))
}

export default { getCountries }