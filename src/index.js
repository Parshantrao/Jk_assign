const express = require('express')
const mongoose = require('mongoose')
const route = require("./routes/route")
const app=express()

app.use(express.json())

mongoose.set('strictQuery', true);
mongoose.connect(
    "mongodb+srv://Parshant_rao:C4fIOvHGi74DVINv@newcluster.squkrr6.mongodb.net/jaikisan"  
)
    .then(()=>console.log("mongoDB is connected"))
    .catch((err)=>console.log(err))

app.use(route)

app.listen(3000,function(){
    console.log("app is running on 3000")
})
