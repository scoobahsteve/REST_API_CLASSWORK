const express = require('express');
const parser = require('body-parser').json();
const Animal = require(__dirname + '/../models/cats');
const handleDBError = require(__dirname + '/../lib/db_error_handler');

var animalRouter = module.exports = exports = express.Router();

animalRouter.post('/cats', parser, (req, res) => {
  var newCat = new Animal(req.body);
  newCat.save((err, data) => {
    if(err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('POSTed');
});

animalRouter.get('/cats/:id', (req, res) => {
  Animal.find({_id: req.params.id}, (err, data) => {
    if(err) return handleDBError(err, res);
    res.status(200).json(data);
  });
  console.log('GETted by ID');
});

animalRouter.put('/cats/:id', parser, (req, res) => {
  var catData = req.body;
  delete catData._id;
  Animal.update({_id: req.params.id}, catData, (err) => {
    if(err) return handleDBError(err, res);
    res.status(200).json({msg: 'you have successfully updated the file'});
  });
  console.log('PUTted');
});

animalRouter.delete('/cats/:id', (req, res) => {
  Animal.remove({_id: req.params.id}, (err) => {
    if(err) return handleDBError(err, res);
    res.status(200).json({msg: 'you have successfully deleted the file'});
  });
  console.log('DELETEd');
});
