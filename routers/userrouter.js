const User = require('../models/usermodel')
const express = require('express')
const  app = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const nodemailer = require('nodemailer')
const otp = 37634746
app.post('/user',async(req,res) =>{
  
    const user = new User(req.body)
    try{
      const token = await user.generateAuthToken()
      await user.save()
res.status(201).send({user,token})
    }
    catch(e){
        res.status(500).send('something went wrong, check in console')
        console.log(e)
    }
})

app.get('/user',auth,async(req,res) =>{
    res.status(200).send(req.user)
})

app.get('/usertasks',auth, async(req,res) =>{
    //console.log(req.query.completed)
    const match = {}
const sort ={}
if(req.query.sortBy){
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc'? -1:1
}
    if(req.query.completed){
        match.completed = req.query.completed==='true'
    }  
   //    console.log(match) 
    try{
        const user = req.user
        await user.populate({
            path:'tasks',
          match,
          options:{
              limit:parseInt(req.query.limit),
              skip:parseInt(req.query.skip),
             sort
          }
        }).execPopulate()
        console.log(user.tasks)
        res.send(user.tasks)
    }
    catch(e){
console.log(e)
    }
    
})
const upload = multer({
   // dest:'avatar',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg)$/))
        return cb(new Error('Please upload word document!'))

        cb(undefined,true)
    }
})
app.post('/users/me/avatar',auth,upload.single('avatar'), async(req,res) =>{
    req.user.avatar = req.file.buffer
    await req.user.save()
res.send()
},
(error,req,res,next) =>{
res.status(400).send({error:error.message})
})

app.delete('/users/me/avatar',auth,async(req,res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send('photo is deleted')
})
app.post('/users/forgotPassword',async(req,res) =>{
    const email = req.body.email
  const transporter = nodemailer.createTransport({
      service:'Gmail',
      auth:{
            user:'as3831843@gmail.com',
          pass:'Nikhil1810013'
      }
  })
const  mailOptions = {
    from: 'Nikhil conatus',
    to: email,
    subject: "ghhg",
    text: `your otp is ${otp}. Sir Otp JAne laga hai!`
  }
     transporter.sendMail(mailOptions)
     res.status(200).send('SUcceessssadsadasd')
})

module.exports = app