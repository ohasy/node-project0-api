var express = require('express')
var bodyParser = require('body-parser')
var {ObjectID} = require('mongodb')
var {mongoose} = require("./db/mongoose")
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var app = express()
const port = process.env.PORT || 3000;


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

//making get api for /todos route to get all todos
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

//making get api for /todos for perticular todo
app.get('/todos/:id',(req,res)=>{
    //res.send(req.params);
    let id = req.params.id
    if(ObjectID.isValid(id)){
        Todo.findById(req.params.id).then((todo)=>{
            if(!todo){
                return  res.status(400).send({ERROR:"ID DOES'NT EXISTS"})
            }
            console.log("TODO:",todo);
            res.send({todo})
        }).catch((err)=>{
            console.log("ERROR",err)
        })
    }else{
        console.log("Object ID is not valid.")
        res.status(400).send({ERROR:"ID NOT VALID"})
    }
    
})

//making an api for /todos to delete any todo
app.delete('/todos/:id',(req,res)=>{
    //get the id
    let id = req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send("Error: id is not in correct format")
    }
        Todo.findByIdAndRemove(id).then((todo)=>{
           if(!todo){
               return res.status(404).send("Error: there is no todo for this id.")
           }
           console.log("TODO Removed:",todo)
           res.send({todo})
        }).catch((err)=>{
            return res.status(400).send()
            console.log('Error:',err)
        })
})

app.listen(port,()=>{
    console.log(`Started on port ${port}`);

})

module.exports={app}