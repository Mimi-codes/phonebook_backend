const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log(
      "Please provide the password as an argument: node mongo.js <password>"
    );
    process.exit(1);
  }
  

const password = process.argv[2]

//for the data to be retrieved on mongo db, remove the angle brackets surrounding password in the url and replace the password with the database user password. Then run node mongo.js password in the CLI and view the data in browse collections on mongodb database deployment
const url =
  `mongodb+srv://phonebook:<password>@cluster0.g20gzso.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

//personSchema definition
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  //model definition
  const Person = mongoose.model("Person", personSchema);

  //list all of the existing entries
  //Also list all of the entries if password is the only parameter given to the program
  if (process.argv.length === 3) {
    Person.find({}).then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    });
  }
  
  //add new entries
  if (process.argv.length > 3) {
    const name = process.argv[3];
    const number = process.argv[4];
  
    const person = new Person({
      name: name,
      number: number,
    });
  
    person.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });
  }