const jwt = require('jsonwebtoken')
const User = require('../models/usermodel')

const auth = async(req,res,next) =>{
    try{
const token = req.header('Authorization').replace('Bearer ','')
const t = jwt.verify(token,process.env.secret)
req.token_id = t._id
//console.log(req.token_id)
const user = await User.findOne({token:token})
req.user = user
next()
}
    catch(e){
        console.log(e)
     res.status(500).send('Please authenticate')
    }

}
module.exports = auth