// Consists exercises phonebook 2.12 - 2.15 step7 - step10

import { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import contactService from './service/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    contactService
      .getAllContacts()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const addNewContact = (event) => {
    event.preventDefault()
    
    const nameMatches = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (nameMatches && !newNumber) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    if (nameMatches && newNumber) {
      const contact = persons.find(personToUpdate => personToUpdate.name === newName)
      const updatedContact = { ...contact, number: newNumber }

      if (window.confirm(`${contact.name} is already added to phonebook, replace the old number with a new one?`)) {
          contactService
          .updateContact(contact.id, updatedContact)
          .then(returnedContact => {
            setPersons(persons.map(person => person.id !== contact.id ? person : returnedContact))
          })
          .catch(error => {
            alert(
              `'${contact.name}' number could not be changed`
            )
            setPersons(persons.filter(person => person.id !== contact.id))
          })
      }
      return
    }       

    const newContact = {
      name: newName,
      number: newNumber
    }

    contactService
      .addContact(newContact)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
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

  const handleDeletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(deletedPerson => deletedPerson.id === id).name}?`)) {
      contactService
        .deleteContact(id)
        .then(returnedContact => {
          setPersons(persons.filter(person => person.id !== id))
    })
  }
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
      <Contacts persons={contactsToShow} deleteContact={handleDeletePerson} />
    </div>
  )

}

export default App