var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to ToDoApp database.");
});

module.exports ={
    mongoose
}



///------------------ new model -----------------------
// var dogs = mongoose.Schema({
//     name:String,
//     speak:String,
//     goodboy_amount:Number
// })

// var dogoModel = mongoose.model('DogsInTheHood',dogs);

// var newDogo = new dogoModel({
//     name:'Vicktor',
//     speak:"Woof",
//     goodboy_amount:10
// })

// newDogo.save().then(res => console.log("Woof Result:",res))
// .catch((err)=>{
//     console.log("Error saving data to dogs model. woof")
// })
/////-----------------------------------------------------

