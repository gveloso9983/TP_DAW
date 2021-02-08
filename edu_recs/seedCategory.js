const mongoose = require('mongoose')
const Category = require('./models/category')
let categories = ['book', 'article', 'application', 'report', 'studentwork', 'monographs'];

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

// to delete everything from database
const seedDB = async() => {
    await Category.deleteMany({});
    var newCategories = new Category()
    categories.forEach(c=>newCategories.categories.push(c))
    await newCategories.save()
}

seedDB().then(()=>{
    mongoose.connection.close()
})