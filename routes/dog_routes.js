const express = require('express');
const parser = require('body-parser').json();
const Animal = require(__dirname + '/../models/dogs');
const handleDBError = require(__dirname + '/../lib/db_error_handler');

var animalRouter = module.exports = exports = express.Router();

animalRouter.post('/dogs', parser, (req, res) => {
  var newDog = new Animal(req.body);
  newDog.save((err, data) => {
    if(err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('POSTed');
});

animalRouter.get('/dogs', (req, res) => {
  Animal.find({}, (err, data) => {
    if(err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted');
});

animalRouter.get('/dogs/:id', (req, res) => {
  Animal.find({_id: req.params.id}, (err, data) => {
    if(err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted by ID');
});

animalRouter.put('/dogs/:id', parser, (req, res) => {
  var dogData = req.body;
  delete dogData._id;
  Animal.update({_id: req.params.id}, dogData, (err) => {
    if(err) return handleDBError(err, res);
    res.status(200).json({msg: 'you have successfully updated the file'});
  });
  console.log('PUTted');
});

animalRouter.delete('/dogs/:id', (req, res) => {
  Animal.remove({_id: req.params.id}, (err) => {
    if(err) return handleDBError(err, res);
    res.status(200).json({msg: 'you have successfully deleted the file'});
  });
  console.log('DELETEd');
});
