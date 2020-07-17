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
const user = await User.findById('5f111ddd8a87ca1c10fb2644')
console.log(typeof(user))
 await user.populate('tasks').execPopulate()
console.log(user.tasks)
}
//main()