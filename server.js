const mongoose = require('mongoose');
const express = require('express');
const app = express();
const catRouter = require(__dirname + '/routes/cat_routes');
const dogRouter = require(__dirname + '/routes/dog_routes');
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/catsndogsdb');

app.use('/api', catRouter);
app.use('/api', dogRouter);

app.listen(PORT, () => console.log('server running on port: ' + PORT));
