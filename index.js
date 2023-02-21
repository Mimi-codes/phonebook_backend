const { request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


//morgan based on tiny configuration that shows the data sent in HTTP POST requests.
//Had to bring it to the top since it didn't work at the bottom of the code
//just before the PORT declaration
//tiny configuration
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data")
  );

//morgan token
morgan.token("data", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " ";
  });
  
  

//gets the time that the request was received and how many entries are in the phonebook at the time of processing the request
app.get('/info', (request, response) => {
    const date = new Date()
    const total = persons.length
    response.send(`<p>Phonebook has info for ${total} people </p> ${date}`)
  })
    
//returns list of phonebook entries
  app.get('/api/persons/', (request, response) => {
    response.json(persons)
  })

//displays info for a single entry but if the entry for the given id is not found, the server responds with page not found error message
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

//delete a phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  //generate id
  const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
    return maxId + 1;
  };


//receiving data
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const verify = persons.find((p) => p.name === body.name);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  } else if (verify) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };

    persons = persons.concat(person);

    response.json(person);
  }
});



  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })