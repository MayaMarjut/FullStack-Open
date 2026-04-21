import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addContact = newPerson => {
const request = axios.post(baseUrl, newPerson)
  return request.then(response => {
    return response.data})
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    return response.data
  })
}

const updateContact = (id, newContactDetail) => {
  const request = axios.put(`${baseUrl}/${id}`, newContactDetail)
  return request.then(response => {
    return response.data
  })
} 

export default { getAllContacts, addContact, deleteContact, updateContact }