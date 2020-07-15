const mongoose =require('mongoose')
const taskSchema = new mongoose.Schema({
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
type:mongoose.Schema.Types.ObjectId,
required:true,
ref:'Uer'
    }
},{
    timestamps:true
})
const Task = mongoose.model('Task',taskSchema )
module.exports = Task