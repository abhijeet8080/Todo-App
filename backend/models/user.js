const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    list:[{
        type:mongoose.Types.ObjectId,
        ref:"List",
    }],
},
{timestamps:true});

const user = mongoose.model("User",userSchema);
module.exports = user;