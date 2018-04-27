const mongoose = require("mongoose");
const validator = require('validator') 
const jwt = require('jsonwebtoken')
const  _ = require("lodash")

var UserSchema = new mongoose.Schema({

    email:{
        type:String,
        minlength:1,
        trim:true,
        required:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message: '{VALUE} is not a valid email.'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
})
 
//overiding the default json response of mongoose so we can reduce the amount of information being sent. like token and password.
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,['_id','email'])
}
//generating token 
UserSchema.methods.generateAuthToken = function() { // so we can bind this keyword
    var user = this; // to store current user instance
    var access = 'auth'
    var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString()

    user.tokens.push({access,token})

    return user.save().then(()=>{
        return token;
    })
}

var  User = mongoose.model('Users',UserSchema)

module.exports = {
    User
}