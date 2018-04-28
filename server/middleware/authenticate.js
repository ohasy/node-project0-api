
 var {User} = require('./../models/user')

//this is the middleware for authentication.
 module.exports.authenticate = (req,res,next) =>{

    var token = req.header('x-auth')
    console.log("token",token)
    User.findByToken(token).then((user)=>{

        if(!user){
            return Promise.reject()
        }
        
        // res.send(user);
        req.user = user;
        req.token = token;
        next(); // it is used so that next function in the parameter acn be called.

    }).catch((error)=>{
        console.log("error in /users/me",error)
        res.status(401).send();
        // we dont put next() here, cause we dont want the control to go to  funtion
        // (req,res)=>{
        //     res.send(req.user)
        // })

    })

}