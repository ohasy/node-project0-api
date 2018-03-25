
const {MongoClient,ObjectID} = require("mongodb")


MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,database)=>{

        if(err){
            return console.log('Unable to conenct to mongo db server');
        }
    console.log('Connected to MongoDb server.')
    
    //to query ----
    database.db('ToDoApp').collection('Users').find({name:"Mike"}).toArray().then((res)=>{

        console.log('Users: \n',JSON.stringify(res,undefined,2))
    }).catch(err=> console.log("Unable to fetch todos",err))

    //To show the count---
    // database.db('ToDoApp').collection('ToDos').find().count().then((count)=>{
    //     console.log(`Docs Count: ${count}`);
    // }).catch((err)=>{
    //     console.log(`Error Counting Docs: ${err}`)
    // })
    // database.close()
});
