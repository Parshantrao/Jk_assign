const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const AutoIncrement = require('mongoose-sequence')(mongoose);

const cardSchema = new mongoose.Schema({
    // cardNumber:{type:String},
    cardType:{type:String,enum:["REGULAR","SPECIAL"]},
    customerName:{type:String,trim:true,lowercase:true},
    status:{type:String,enum:["ACTIVE","INACTIVE"],default:"ACTIVE"},
    vision:{type:String},
    customerID:{type:ObjectId,ref:"Customer"}
})
cardSchema.plugin(AutoIncrement,{inc_field: 'cardNumber'})
module.exports=mongoose.model("Card",cardSchema)