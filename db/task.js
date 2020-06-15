const mongoose =require('mongoose')

const Task = mongoose.model('Task',{
    description:{
        type:String,
        required:true,
        trim :true
    },
    completed:{
        required:true,
        type:Boolean,
        default: false
    },
    owner:{
type:mongoose.Schema.Types.ObjectId

    }
})
module.exports = Task