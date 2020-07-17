const express = require('express')
const bcrypt = require('bcryptjs')
const Task = require('./task.js')
const Router = require('./router.js')
const auth = require('./middleware.js')
const User = require('./model.js')
const router = new express.Router()
router.post('/task',auth,async(req,res)=>{
    const task= new Task({
        ...req.body,
        owner:req.token._id
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
router.get('/tasks/:id',auth, async(req,res) =>{
    const _id =  req.params.id
    try{
let task = await Task.findOne({_id:_id})
let tok = req.token._id
let p = task.owner
task = await Task.findOne({_id,owner:p})
const m= req.user
//console.log(m._id)
if(p==tok){
if(task)
   res.status(200).send({task})
   }
    else
   res.status(400).send('The user is nnot authenticated')
}
    catch(e){
        console.log(e)
        res.status(500).send('something went wrong from task router')
    }
})
module.exports = router