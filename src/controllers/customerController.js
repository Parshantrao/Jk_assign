const {cardModel,customerModel}=require("../models")
const validator = require('../utils/validator')
const moment = require("moment")

const createCustomer = async function(req,res){
    try{
        let {firstName,lastName,mobileNumber,DOB,email,address}=req.body
        if(!validator.isValidObject(req.body)){
            return res.status(400).send({status:false , message:"pls provide customer details"}) 
        }

        let reqField = ["firstName","lastName","mobileNumber","DOB","email","address"]
        for(let key of reqField){
            if(!validator.isValid(req.body[key])){
                return res.status(400).send({status:false, message:`${key} field is required`})
            }
        }

        if(!validator.isValidName(firstName)){
            return res.status(400).send({status:false ,message:"first name can only contains alphabets"})
        }
        if(!validator.isValidName(lastName)){
            return res.status(400).send({status:false ,message:"last name can only contains alphabets"})
        }
        if(!validator.isValidMobileNumber(mobileNumber)){
            return res.status(400).send({status:false ,message:"mobile number must be a valid Indian phone number"})
        }
        if(!moment(DOB,'YYYY-MM-DD', true).isValid()){
            return res.status(400).send({status:false,message:"DOB must be in 'YYYY-MM-DD' formate "})
        }
        if(!moment(DOB).isBefore(moment().format("YYYY-MM-DD"))){
            return res.status(400).send({status:false, message:"pls provide valid DOB"})
        }
        if(!validator.isValidEmail(email)){
            return res.status(400).send({status:false, message:"Invalid email"})
        }
        /// address
        let obj={firstName,lastName,mobileNumber,DOB,email,address}
        let customer = await customerModel.create(obj)
        return res.status(201).send({status:true, data:customer})

    }       
    catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

const getCustomerList = async function(req,res){
    try{
        let customerList = await customerModel.find({status:"ACTIVE"}).select({_id:0})
        return res.status(200).send({status:true,customerList:customerList})
    }
    catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

const deleteCustomer = async function(req,res){
    try{
        let customerId = req.params.customerId
        
        const costumer = await customerModel.findOneAndUpdate({_id:customerId,status:"ACTIVE"},{status:"INACTIVE"})
        if(!costumer){
            return res.status(404).send({Status:false, message:"customer not found"})
        }
        res.status(200).send({status:true, message:"customer deleted"})
    }
    catch(err){
        res.status(500).send({status:false, message:err.message})
    }
}

module.exports={
    createCustomer,
    getCustomerList,
    deleteCustomer
}