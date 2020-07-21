const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nikhil:nikhil@cluster0.e7biw.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
console.log('connected')