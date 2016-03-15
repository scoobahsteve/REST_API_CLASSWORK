var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
  breed: {type: String, default: 'cat'},
  fullName: {type: String, trim: true, unique: true, required: true},
  gender: {type: String, enum: ['Male', 'Female']},
  age: {type: Number}
});

module.exports = mongoose.model('cats', catSchema);
