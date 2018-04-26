const {ObjectID} = require("mongodb")
const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require("./../server/models/todo")
const {User} = require("./../server/models/user")

Todo.remove({}).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log("Error in deleting doc",err)
})

Todo.findOneAndRemove({}).then((res)=>{

}).catch((err)=>{
    console.log("Error in deleting one doc",err)
})

Todo.findByIdAndRemove('5abc2565a699744dcc575709').then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log("Error in deleting one doc",err)
})