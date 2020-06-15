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
app.use(express.json())
app.use(userrouter)
app.use(taskrouter)
app.listen(port,() =>{
    console.log('port is on '+port)
})