const express = require('express')
const bcrypt = require('bcryptjs')
const Task = require('./task.js')
const auth = require('./middleware.js')
const router = new express.Router()
router.post('/task',async(req,res)=>{
    const task= new Task({
        ...req.body,
        owner:req.user
    })
    try{
await task.save()
res.status(201).send(task)
    }
    catch(e){
console.log(e)
res.status(400).send('something went wrong')
    }
})
module.exports = router