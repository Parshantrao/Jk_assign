const nameRegex=/^[a-z ]+$/i
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,19})/
const mobileRegex=/^[6-9]\d{9}$/
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const isValid = function(value){
    if(typeof value == undefined || value == null) return false;
    if(typeof value == "string" && value.trim().length===0 ) return false;
    return true
}

const isValidName = function(value){
    return nameRegex.test(value)
}

const isValidEmail = function(value){
    return emailRegex.test(value)
}

const isValidMobileNumber = function(value){
    return mobileRegex.test(value)
}

const isValidCardType = function(value){
    let arr=["REGULAR","SPECIAL"]
    for(let key of arr){
        if(value.trim().toUpperCase()===key) return key
    }
    return false
}

const isValidStatus = function(value){
    let arr=["ACTIVE","INACTIVE"]
    for(let key of arr){
        if(value.trim().toUpperCase()===key) return key
    }
    return false
}

const isValidObjectId = function(value){
    console.log(new ObjectId(value) ,(String)(new ObjectId(value)),"console.log")
    if(ObjectId.isValid(value)){
        if((String)(new ObjectId(value)) === value)
            return true;
        return false;
    }
    return false;
}

const isValidObject = function(value){
    return Object.keys(value).length
}

module.exports={
    isValid,
    isValidObject,
    isValidName,
    isValidEmail,
    isValidCardType,
    isValidMobileNumber,
    isValidObjectId,
    isValidStatus
}