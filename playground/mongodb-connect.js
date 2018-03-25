
const {MongoClient,ObjectID} = require("mongodb")


MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,database)=>{

        if(err){
            return console.log('Unable to conenct to mongo db server');
        }
    console.log('Connected to MongoDb server.')

    // database.db('ToDoApp').collection('ToDos').insertOne({
    //     text:'Something to Do again',
    //     completed:false
    //     },(err,res)=>{
    //             if(err){
    //                 return console.log('Unable to insert todo')
    //             }
    //             console.log(JSON.stringify(res.ops,undefined,2))
    //     }
    // )

    database.db('ToDoApp').collection('Users').insertOne({
        name:'Yash Ojha',
        age: 22,
        location: 'MDV Colony'
        },(err,res)=>{
                if(err){
                    return console.log('Unable to insert todo')
                }
                console.log(res.ops[0]._id.getTimestamp())
        }
    )
    database.close()
});
