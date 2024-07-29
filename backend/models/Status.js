const mongoose = require('mongoose');
const {Schema} = mongoose;

const StatusSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type: String,
        requied: false,
    },
    pic:{
        type:String,
        contentType: String,
        data:Buffer,
        required: false
    },
    tag:{
        type: String,
        default:"General"
    },
    date :{
        type:Date,
        default:Date.now
    }
});


module.exports= mongoose.model('status', StatusSchema);