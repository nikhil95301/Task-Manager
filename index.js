const express = require('express')
require('./db/mongoose.js')
const userrouter = require('./routers/userrouter')
const taskrouter = require('./routers/taskrouter')
const app = express()
const port = process.env.PORT||3000
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
    console.log('port is on '+port)
})

