const mongoose = require('mongoose')

mongoose.connect(process.env.mongo,   {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

console.log('connected')