const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema({
   name: String,
   description: String,
   img: String,
   gender: String,
   age:String,
   link: String,
   likes: Number
});

const Pets = mongoose.model('Pets', petsSchema);

module.exports = Pets;
