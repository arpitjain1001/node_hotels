const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  work: {
    type: String,
    enum: ['chef', 'Manager', 'waiter'],
    default: 'Other'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: false
  },

  address: {
    type: String,
  },

  salary: {
    type: Number,
    required: true,
  }, 
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;

