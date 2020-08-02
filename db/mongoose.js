const mongoose = require('mongoose')
//console.log(process.env.mongo)
mongoose.connect(`mongodb+srv://nikhilakg:${m}@cluster0.dnspg.mongodb.net/<dbname>?retryWrites=true&w=majority`,   {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})

console.log('connected')