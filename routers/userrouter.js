const User = require('../models/usermodel')
const express = require('express')
const  app = new express.Router()
const auth = require('../middleware/auth')

app.post('/user',async(req,res) =>{
  
    const user = new User(req.body)
    try{
      const token = await user.generateAuthToken()
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
    const user = req.user
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
    res.send(user.tasks)
})

module.exports = app