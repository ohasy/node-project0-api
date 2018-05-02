var env = process.env.NODE_ENV || 'development'
console.log("Environment Variable:",env)

if(env === 'development' || env === 'test'){
var config  = require('./config.json')
var envConfig = config[env]

console.log("enviromnetal vars:")
Object.keys(envConfig).forEach((key)=>{
    process.env[key] = envConfig[key]
    console.log(key,":",process.env[key])
})
}

// if(env === 'development'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoApp'
// }else if(env === 'test'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
// }