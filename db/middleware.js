const User = require('./model.js')
const jwt = require('jsonwebtoken')
const auth = async(req,res,next) =>{
    try{
        
const token = req.header('Authorization').replace('Bearer ','')
console.log(token)
const t= jwt.verify(token,'dfkjdfbjn')
if(!t){
    console.log('not verified')
}
const user = await User.find({_id:t._id,'tokens.token': token})
if(!user){
  throw new Error()
}
user.tokens=[]
req.token = token
req.user = user
next()
    }catch(e){
        console.log(e)
        res.send('Please authenticate')
    }
}
module.exports = auth