const { request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require("dotenv").config();
const Person = require("./models/person");


//middlewware declarations
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))


//returns list of phonebook entries
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
    console.log(persons)
  });
});

//displays info for a single entry but if the entry for the given id is not found, the server responds with page not found error message
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//gets the time that the request was received and how many entries are in the phonebook at the time of processing the request
app.get("/info", (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.send(
        `<p>Phonebook has info for ${
          people.length
        } people</p><p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

//deletes phonebook entries
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

//creates new entry
app.post("/api/persons", (request, response, next) => {
  const { name, number } = request.body;

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

//update the phone number of the existing entry 
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

//error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
//error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});