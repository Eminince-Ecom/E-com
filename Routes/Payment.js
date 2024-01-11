const express=require('express')
const  paymentsR=require("../Controller/Payment")
const router=express.Router()

router.post("/pay", paymentsR)



module.exports= router