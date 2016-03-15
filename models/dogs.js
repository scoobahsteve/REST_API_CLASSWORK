var mongoose = require('mongoose');

var dogSchema = new mongoose.Schema({
  breed: {type: String, default: 'dog'},
  fullName: {type: String, trim: true, unique: true, required: true},
  gender: {type: String, enum: ['Male', 'Female']},
  age: {type: Number}
});

module.exports = mongoose.model('dogs', dogSchema);
