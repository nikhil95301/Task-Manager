const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const sc = process.env.secret
const userSchema = new mongoose.Schema({
     name:{
         type:String,
         required:true,
     },
     email:{
         type:String,
         //unique:true,
         required:true
     },
     password:{
         type:String,
         required:true,
     },
     token:{
         type:String
     },
     avatar:{
         type:Buffer
     }
},{
    timestamps:true
})

userSchema.methods.generateAuthToken = async function() {
    const user =this
const token = jwt.sign({_id:user._id.toString()},sc)
user.token = token
// await user.save()
return token
}

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.token
    delete userObject.avatar
    return userObject
}
const User = mongoose.model('User',userSchema)
module.exports = User