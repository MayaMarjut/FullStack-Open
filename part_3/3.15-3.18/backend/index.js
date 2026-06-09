require('dotenv').config()
require('./instrument.js')
const Sentry = require('@sentry/node');
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

// TODO: Testaa post
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(amountOfPeople => {
    const info = `Phonebook has information for ${amountOfPeople} people`
    const date = new Date()
    response.send(`<p>${info}</p><p>${date}</p>`)
  })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  
  if (!body.name) {
    const error = new Error('Name is missing')
    error.status = 400
    return next(error)
  }
  
  if (!body.number) {
    const error = new Error('Number is missing')
    error.status = 400
    return next(error)
  }
  
  const person = new Person({
    name: body.name,
    number: body.number
  })
  
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})



Sentry.setupExpressErrorHandler(app);

app.use(function onError(err, req, res, next) {
  const statusCode = err.status || 500
  res.status(statusCode).json({
    error: err.message,
    sentryId: res.sentry
  })
});

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
