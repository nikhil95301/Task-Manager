const express = require('express')

require('dotenv').config()
require('./db/mongoose.js')
const userrouter = require('./routers/userrouter')
const taskrouter = require('./routers/taskrouter')
const app = express()
const port = process.env.PORT // Here I want to use dotenv
app.use((req,res,next) =>{
    next()
   //res.send('site is temporarily closed')

})

app.use(express.json())
app.use(userrouter)
app.use(taskrouter)
app.listen(port,(e) =>{
    if(e)
    console.log('error'+ e)
    console.log('port is on '+ port)
})

