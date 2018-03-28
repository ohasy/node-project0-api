
const {MongoClient,ObjectID} = require("mongodb")


MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,database)=>{

        if(err){
            return console.log('Unable to conenct to mongo db server');
        }
    console.log('Connected to MongoDb server.')
    
    //to query ----
    // database.db('ToDoApp').collection('Users').find({name:"Mike"}).toArray().then((res)=>{

    //     console.log('Users: \n',JSON.stringify(res,undefined,2))
    // }).catch(err=> console.log("Unable to fetch todos",err))

    //To show the count---
    // database.db('ToDoApp').collection('ToDos').find().count().then((count)=>{
    //     console.log(`Docs Count: ${count}`);
    // }).catch((err)=>{
    //     console.log(`Error Counting Docs: ${err}`)
    // })

    //To delete many -----
    // database.db('ToDoApp').collection('ToDos').deleteMany({text:"Eat Lunch"}).then((res)=>{
    //     console.log("Todos:::",res)
    // })
        //To delete one -----
        // database.db('ToDoApp').collection('ToDos').deleteOne({text:"Eat Lunch"}).then((res)=>{
        //     console.log("Todos:::",res)
        // })

        //To find one and  delete one -----
        // database.db('ToDoApp').collection('ToDos').findOneAndDelete({completed:true}).then((res)=>{
        //     console.log("Todos:::",res)
        // })
    
    //Deleting Duplicates
        database.db('ToDoApp').collection('ToDos').deleteMany({name:'Andrew'});
        database.db('ToDoApp').collection('ToDos').findOneAndDelete({_id: new ObjectID("5ab7af7a99b7b9044858d870")}).then((res)=>{
                console.log("Result:",res)
        });

    // database.close()
});
