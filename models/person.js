//this file contains the person.js database configuration into its own module
//mongoose middleware
const mongoose = require("mongoose");

//stores the mongodb uri to connect to the mongo db database
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

//sets connection to the mongo db database
mongoose
.connect(url)
.then(() => {
console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

  //validates number entries of the phonebook
const numberValidators = [
  {
    // Minimum length validator
    validator: (number) => {
      if ((number[2] === "-" || number[3] === "-") && number.length < 9) {
        return false;
      }
      return true;
    },
    msg: "must be at least 8 digits",
  },
  {
    // Regex validator to allow only numbers
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number);
    },
    msg: "invalid phone number",
  },
];

//specific validation rules for each field in the schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: numberValidators,
    required: true,
  },
});

//Modification using the toJSON method of the schema which prevents the return of objects of the mongo versioning field __v to the frontend returned by Mongoose 
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//sets value to the module.exports variable
module.exports = mongoose.model("Person", personSchema);
