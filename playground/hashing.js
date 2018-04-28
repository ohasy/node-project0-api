const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

var password = '123abc';

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     })
// })

var hashedPassword = '$2a$10$X4nd0W.NpzG2.CqZVfBDX.TbnF8z9LIjHrhXfkjL532twTQhmohim'

bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log("compare hashed password:",res)
})
// var data = {
//     id:10
// }

// var token = jwt.sign(data,'123abc');
// console.log("Token:",token)

// var decoded = jwt.verify(token,'123abc');
// console.log("Decoded:",decoded)

//var message = 'I am user no. 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id:4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+'salt_value').toString()
// }

// //tampering
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// //but adding salt which is secret saves us
// var resultHash = SHA256(JSON.stringify(token.data)+'salt_value').toString()

// if(resultHash === token.hash){
//     console.log('Data was not changed')
// }else{
//     console.log('Data was changed')
// }