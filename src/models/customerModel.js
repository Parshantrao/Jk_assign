const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName:{type:String,lowercase:true,trim:true},
    lastName:{type:String,lowercase:true,trim:true},
    mobileNumber:{type:String,trim:true},
    DOB:{type:Date},
    email:{type:String,required:true,trim:true,lowercase:true},
    address:{type:String,trim:true,lowercase:true},
    customerID:{type:String},
    status:{type:String,enum:["ACTIVE","INACTIVE"],default:"ACTIVE"}
})

module.exports=mongoose.model("Customer",customerSchema)