 // Exercise 3.9 - 3.11 Phonebook step9 to step10

const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.send(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const amountOfPeople = persons.length
  const info = `Phonebook has infor for ${String(amountOfPeople)} people`
  const date = new Date()
  res.send(`<p>${info}</p><p>${date}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (!person) {
    return res.status(404).end()
  }

  persons = persons.map(person => {
    if (person.id !== id) {
      return person
    }

    const { number, ...personWithoutNumber } = person
    return personWithoutNumber
  })

    res.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).send({ 
      error: 'Name is missing' 
    })
  }

  if (!body.number) {
    return res.status(400).send({ 
      error: 'Number is missing' 
    })
  }

  if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(400).send({ 
      error: 'Name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.send(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})