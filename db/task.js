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
ref:'User'
    }
},{
    timestamps:true
})

// taskSchema.methods.popul = async function(){
    
//     const user = this
//     await user.populate('tasks').exePopulate()
    
//     return user.tasks
// }
const Task = mongoose.model('Task',taskSchema )
module.exports = Task