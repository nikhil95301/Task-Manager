const User = require('./model.js')
const jwt = require('jsonwebtoken')
const auth = async(req,res,next) =>{
    try{
const token = req.header('Authorization').replace('Bearer ','')
const t= jwt.verify(token,'dfkjdfbjn')
if(!t){
    console.log('not verified')
}
//console.log(t)
//console.log(t._id)
// const user = User.findOne({_id:t._id})
// if(!user){
//   throw new Error()
// }
req.token = t
//console.log(user)
//console.log(req.token)
//req.user = user
///console.log(req.user)
next()
    }catch(e){
        console.log(e)
        res.send('Please authenticate')
    }
}
module.exports = auth