var express = require('express')
var bodyParser = require('body-parser')
var {mongoose} = require("./db/mongoose")
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json())
 
//post api for /todos route
app.post('/todos',(req,res)=>{

    console.log(req.body)

    var todo = new Todo({
        text:req.body.text
    })

    todo.save().then((doc)=>{
        res.send(doc)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
})

//making get api for /todos route
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

app.listen(3000,()=>{
    console.log('Started on port 3000');

})

module.exports={app}