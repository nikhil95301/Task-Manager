const express = require('express')
require('./mongoose.js')
const userrouter = require('./router.js')
const taskrouter =require('./taskrouter.js')
const app = express()

const port = process.env.PORT||3000
const User = require('./model.js')
app.use((req,res,next) =>{
    next()
   //res.send('site is temporarily closed')

})
const Task = require('./task.js')

app.use(express.json())
app.use(userrouter)
app.use(taskrouter)
app.listen(port,(e) =>{
    if(e)
    console.log('error'+ e)
    console.log('port is on '+port)
})
const main = async () =>{
const user = await User.findById('5f01fe77a07ae5095c50d790')
 await user.populate('tasks').execPopulate()
//console.log(user.tasks)
}
//main()