const mongoose = require('mongoose')
const Resource = require('./models/resource')

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/TP_DAW';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function () {
  console.log("Successful MongoDB connection ...")
});

  const g = new Resource({
    authorId: '5fff8db9c3f9de18a0d41c5b',
    type: 'article',
    title: 'University of Minho'
  })
  
  g.save()
    .then(r => {
      console.log(r)
    })
    .catch(e => {
      console.log(e)
    })
  