const express=require('express')
const Payment=require("../Controller/Payment")
const router=express.Router()

router.post("/:cartId",Payment)



module.exports= router