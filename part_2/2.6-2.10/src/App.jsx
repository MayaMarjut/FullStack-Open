import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addNewContact = (event) => {
    event.preventDefault()

    const nameMatches = persons.some(person => person.name === newName)
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
      <div>filter shown with<input value={newFilter} onChange={handleFilter}/></div>
      <form>
        <div>
          name: <input value={newName} onChange={handleAddPerson} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleAddNumber} />
        </div>
        <div>
          <button type="submit" onClick={addNewContact}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contactsToShow.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )

}

export default App