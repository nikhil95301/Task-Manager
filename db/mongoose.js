const mongoose = require('mongoose')
console.log(process.env.mongo)
mongoose.connect(process.env.mongo,   {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

console.log('connected')