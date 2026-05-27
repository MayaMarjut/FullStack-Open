// Exercise 3.12: MongoDB and Mongoose

require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI, { family: 4 }).then(res => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })



const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const id = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  id,
  name,
  number
})

if (process.argv.length < 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
    result.forEach(person => {
        console.log(person.name, person.number)
    })
    mongoose.connection.close()
    })
} else {
    person.save().then(result => {
    console.log('Added ', result.name, ' number ',result.number, ' to phonebook')
    mongoose.connection.close()
    })
}


