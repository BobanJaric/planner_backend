const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const flightsRoutes = require('./routes/flights-routes');
const usersRoutes = require('./routes/users-routes');
const notesRoutes = require('./routes/notes-routes');
const brokerRoutes = require('./routes/broker-routes');
const aircraftRoutes = require('./routes/aircraft-routes');
const crewRoutes = require('./routes/crew-routes');
const caaRoutes = require('./routes/caa-routes');
const newsRoutes = require('./routes/news-routes');
const arhiveRoutes = require('./routes/arhive-routes');
const pdfRoutes = require('./routes/pdf-routes');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/flights', flightsRoutes);
app.use('/api/users', usersRoutes);
app.use('/create-pdf', pdfRoutes);
app.use('/api/getnotes', notesRoutes);
app.use('/api/broker', brokerRoutes);
app.use('/api/aircraft', aircraftRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/arhive', arhiveRoutes);
app.use('/api/caa', caaRoutes);
app.use('/api/news', newsRoutes);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' });
});


app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
});


const URI = 'mongodb://localhost/appbase';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    const server = app.listen(5000, "localhost");
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      console.log('client connected');
    });
  }).catch(err => {
    console.log(err);
  });

