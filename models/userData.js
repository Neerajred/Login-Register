const mongoose = require("mongoose")

const userdata = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
},{ timestamps: true })


module.exports = mongoose.model('userdata',userdata)