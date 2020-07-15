const validator = require('validator')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Task = require('./task.js')
const Taskrouter = require('./taskrouter.js')
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
    token:{
        type:String
    }
},{
timestamps:true
})
userSchema.virtual('tasks',{
    ref:'Task',
localField:'_id',
foreignField:'owner'
})
userSchema.methods.toJSON = function(){
    const user =this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.token
    return userObject
}
userSchema.methods.generateAuthToken = async function(){
    
    const user = this
    token = jwt.sign({_id:user._id.toString()},'dfkjdfbjn')
    user.token=token
    await user.save()
    return token
}

module.exports=(mongoose.model('Uer',userSchema))
