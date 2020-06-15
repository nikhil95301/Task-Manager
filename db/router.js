const express = require('express')
const User = require('./model.js')
const bcrypt = require('bcryptjs')
const auth = require('./middleware.js')
const router = new express.Router()
router.post('/user', async (req,res) =>{
    const user = new User(req.body)
    // try{
    //    await user.save()
    // //    const hashedpassword = await bcrpyt.hash(req.body.password,8)
    // //    console.log(hashedpassword)
    //    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //     return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    //   }
    //   var secretKey = "6LdhWusUAAAAAKtjj3FQ-P03xyzXD6TCdmXCJlFi"
    //   var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    //   request(verificationUrl,function(error,response,body) {
    //     body = JSON.parse(body);
    //     if(body.success !== undefined && !body.success) {
    //       return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    //     }
    //     res.json({"responseCode" : 0,"responseDesc" : "Success"});
    //   });
    //    res.status(201).send(user)
    // }catch(e) {
    //      res.status(400).send(e)
    // }
    try{

    const t = await user.generateAuthToken()
    res.status(201).send({user,t})
    }
    catch(e){
      console.log(e)
      res.status(400).send(e)
    }
})
router.post('/user/login',async (req,res) =>{
  try{
const user = await User.findOne({email:req.body.email,password:req.body.password})
if(user){
 const t = await user.generateAuthToken()
  res.status(200).send({user,t}) 
}
else{
res.status(500).send('Not found')
}
  }
  catch(e){
    console.log(e)
    res.status(400).send(e)
  }
})
router.post('/user/logout',auth, async (req,res) =>{
try{

  //req.user.tokens
 const user = req.user
 console.log(user)
 res.status(200).send(req.user)
}
catch(e){
  console.log(e)
res.status(500).send()
}
})
router.get('/user/get',auth,  async (req,res) =>{
  try{
    res.send(req.user)
  }
  catch(e){
    console.log(e)
    res.send(e)
  }
})
module.exports = router