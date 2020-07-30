const express = require('express')
const app = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/taskmodel')

app.post('/tasks',auth,(req,res) =>{
  
    const task = new Task({
        ...req.body,
        owner: req.token_id
    })
    try{
        task.save()
        res.send(task)
    }
catch(e){
console.log('Something went wrong, see in console')
}
})  
module.exports = app