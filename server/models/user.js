const mongoose = require("mongoose");
const validator = require('validator') 
const jwt = require('jsonwebtoken')
const  _ = require("lodash")
const bcrypt = require('bcryptjs')

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
 

// UserSchema.methods are instance methods.
// UserSchema.statics are the modal methods.

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

//verifying and finding the associated user by token for private route
UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    
    try{
        decoded = jwt.verify(token,'abc123')
    }catch(e){
        // return new Promise((resolve,reject)=>{
        //     reject();
        // })
        return Promise.reject("findByToken promise got rejected") // it will used in the catch  block of the promise
    }
    // it will be called in then callback of the promise.
    return User.findOne({
        '_id':decoded._id, // you can use quotes here too.
        'tokens.token':token, //query for nested queries is done in strings. see the dot.
        'tokens.access':'auth'
    })
}

//using mongoose middleware to hash the password befor the save event.
UserSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            })
        })
    }else{
        next()
    }
})

UserSchema.statics.findByCredentials = function (email,password){
    var User = this;
//first we check if email is there, and then 
//compare hash with raw password given by client
//if it matches we send user object
//if it dont we throw error
    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject("Error: Invalid Credentials");
        }
        return bcrypt.compare(password,user.password).then((res)=>{

            if(res){
                    return user;
                }
                else{
                    return "Error: Invalid Credentials"
                }
                console.log("compare hashed password:",res)

            }).catch((err)=>{
                return "Error: Invalid Credentials"
        })
        // return new Promise((resolve,reject)=>{
        //     bcrypt.compare(password,user.password,(err,res)=>{ //here user.password is hash password stored in the db
        //         if(res){
        //             resolve(user);
        //         }
        //         else{
        //             reject("Error: Invalid Credentials")
        //         }
        //         console.log("compare hashed password:",res)
        //     })
        // })
    })
}

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull:{ // to delete any item from array where the properties is matched.
            tokens:{
                token:token
            }
        }
    })
}

var  User = mongoose.model('Users',UserSchema)

module.exports = {
    User
}