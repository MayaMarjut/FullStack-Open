// Consists exercises phonebook 2.11

import { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('vastaus saatu', response)
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addNewContact = (event) => {
    event.preventDefault()

    const nameMatches = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (nameMatches) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newContact))
    setNewName('')
    setNewNumber('')
  }

  const handleAddPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  } 

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  } 

  const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} addFilter={handleFilter} />
      <PersonForm 
        name={newName} 
        number={newNumber} 
        addNumber={handleAddNumber} 
        addPerson={handleAddPerson} 
        addContact={addNewContact} /> 
      <h2>Numbers</h2>
      <Contacts persons={contactsToShow} />
    </div>
  )

}

export default App