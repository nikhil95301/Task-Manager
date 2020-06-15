const validator = require('validator')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema  = new mongoose.Schema({
name:{
    type:String,
 required: true,
 trim: true
},
email:{
    type:String,
    trim:true,
    required:true,
    validate(value){
        if(!validator.isEmail(value))
        throw new Error('email is not valid')
    }
},
student_number:{
    type:Number,
    required:true,
},
phone:{
    type:Number,
    required:true
},
password:{
    type:String,
    required:true,
    minlength: 8
},
branch:{
    type:String,
    enum:['CSE','IT','cse','it','Cse','It'],
    ignoreCase:true,
    required:true
},  
tokens:[{
    token:{
        type:String
    }
}]
})
userSchema.methods.generateAuthToken = async function(){
    const user = this
    token = jwt.sign({_id:user._id.toString()},'dfkjdfbjn')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete  userObject.branch
    delete user.tokens
    return userObject
}
module.exports=(mongoose.model('User',userSchema))