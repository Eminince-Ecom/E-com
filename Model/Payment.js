const mongoose=require("mongoose")

const paymentSchema=mongoose.Schema({
    cartId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Cart",
    required:true
    },
    paymentMethod:{
        type:String,
     required:true
    },
    PaymentIntendId:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date.now,
        required:true
    }
})

const Payment=mongoose.model("Payment",paymentSchema)

module.exports=Payment