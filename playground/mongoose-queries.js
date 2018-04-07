const {ObjectID} = require("mongodb")
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require("./../server/models/todo")
const {User} = require("./../server/models/user")

var id = "5abc29b4be9dff426cef71d1"

if(!ObjectID.isValid(id)){
    console.log("Object ID is not valid")
}

// Todo.find({
//     _id:id
// }).then((todos)=>{
//      console.log("TODOS:",todos);
// })

// Todo.findById(id).then((todo)=>{
  
//     if(!todo){
//         return console.log("Id not found")
//     }
//     console.log("Todo:",todo)

// }).catch((err)=>console.log("ERROR:",err))


User.findById(id).then((user)=>{
    if(!user)
    return console.log("Incorrect USER ID")
    console.log("USER:",user)   
}).catch((err)=>{
    console.log("ERROR:",err)
})