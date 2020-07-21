const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
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
     }
})
userSchema.methods.generateAuthToken = async function() {
    const user =this
const token = jwt.sign({_id:user._id.toString()},'nikhilBawa')
user.token = token
await user.save()
return token
}
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
const User = mongoose.model('User',userSchema)
module.exports = User