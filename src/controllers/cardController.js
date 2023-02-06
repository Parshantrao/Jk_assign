const {cardModel,customerModel}=require("../models")
const validator = require("../utils/validator")

const newCard = async function(req,res){
    try{
        let customerId=req.params["customerId"]
        let {cardType,customerName,status,vision}=req.body

        let mandField = ["cardType","customerName"]
        for(let key of mandField){
            if(!validator.isValid(req.body[key])){
                return res.status(400).send({status:false , message:`${key} is required`})
            }
        }
        if(!validator.isValidObjectId(customerId)){
            return res.status(400).send({status:false , message:"Invlaid customerId"})
        }
        if(!validator.isValidName(customerName)){
            return res.status(400).send({status:false, message:"name can only contains alphabets"})
        }
        if(!validator.isValidStatus(status)){
            return res.status(400).send({status:false , message:"status can only be - ACTIVE , INACTIVE"})
        }
        status = validator.isValidStatus(status)

        if(!validator.isValidCardType(cardType)){
            return res.status(400).send({status:false ,message:"card type can only be - REGULAR , SPECIAL"})
        }
        cardType = validator.isValidCardType(cardType)

        let obj={cardType,customerName,status,vision}
        let card = await cardModel.create(obj)
        return res.status(201).send({status:true, data:card})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

const getCardList = async function(req,res){
    try{
        const cardList = await cardModel.find().select({_id:0})
        res.status(200).send({status:true, data:cardList})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})

    }
}

module.exports={
    getCardList,
    newCard
}