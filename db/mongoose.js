const mongoose = require('mongoose')
//console.log(process.env.mongo)
mongoose.connect("mongodb://localhost:27017/task-manager-api",   {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

console.log('connected')