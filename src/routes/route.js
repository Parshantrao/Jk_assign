const express=require('express')
const router = express.Router()
const {cardController,customerController}=require("../controllers")

router.get("/*",function(req,res){
    res.send("no such endpoint")
})

router.post("/customer",customerController.createCustomer)
router.get("/customer",customerController.getCustomerList)
router.delete("/customer/:customerId",customerController.deleteCustomer)

router.post("/card/:customerId",cardController.newCard)
router.get("/card",cardController.getCardList)




module.exports=router