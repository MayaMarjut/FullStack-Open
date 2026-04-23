 // Exercise 2.18 - 2.20 Countries data step 1 to step3
 
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import countriesService from './services/countries'
import Countries from './components/Countries'
import SingleCountry from './components/SingleCountry'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountryData] = useState({})
  const [countriesToShow, setCountriesToShow] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')

  useEffect(() => {
    if (countries) {
      countriesService.getCountries().then(data => {
        setCountries(data)
      })
    }
  }, [])

  const doSearch = (event) => {
    const filterValue = event.target.value
    setNewFilter(filterValue)

    const namesOfCountries = countries.filter(country => country.toLowerCase().includes(filterValue.toLowerCase()))
    setCountriesToShow(namesOfCountries)

    if (namesOfCountries.length === 1) {
      const countryName = namesOfCountries[0].toLowerCase()
      countriesService
        .getSingleCountry(countryName)
        .then(returnedCountry => {
          setCountryData(returnedCountry)
        })
      return
    }

    if (namesOfCountries.length > 10) {
      setNotificationMessage('too many matches, spesify another filter')
      setCountryData(null)
      return
    }

    if (namesOfCountries.length < 10) {
      setNotificationMessage('')
      setCountryData(null)
      return
    }
  }

  const showCountryData = (countryName) => {
    countriesService
      .getSingleCountry(countryName.toLowerCase())
      .then(returnedCountry => {
        setCountryData(returnedCountry)
      })

  }

  return (
    <>
      <Filter filter={newFilter} onChange={doSearch}></Filter>
      <p>{notificationMessage}</p>
      <Countries countries={notificationMessage || country ? [] : countriesToShow} showCountry={showCountryData}></Countries>
      <SingleCountry countryData={country}></SingleCountry>
    </>
  )
}

export default App
