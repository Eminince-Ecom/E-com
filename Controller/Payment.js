const stripekey=process.env.STRIPE
const stripe=require('stripe')(stripekey)
const PaymentModel=require('../Model/Payment')
const cartModel= require('../Model/Cart')
const { findById } = require('../Model/User')




const Payment= async(req,res,next)=>{
    const cartId = req.body;    try {
const {paymentMethod,paymentIntendId}=req.body   
const cart= await cartModel.findById({cartId})
if(!cart){
    res.status(401/json({message:"user cart not found"}))
    return
}
if(cart.paymentstatus==="paid"){
    res.json({message:'Already Paid by Customer'})
}
const paymentIntent= await stripe.paymentIntents.retrieve(paymentIntendId)
if(paymentIntent==='succeeded'){
    cart.paymentstatus=="paid"
    await cart.save()

const savepayment= new PaymentModel({
    cartId:cartId,
    paymentMethod:paymentMethod,
    PaymentIntendId:PaymentIntendId,
    amount: amount
})

await savepayment.save()
 res.status(200).json({message:"Payment Successfull Thank you for Shoping at Ecom"})

}else{
    res.json({message:"Payment Failed  in payment api"})
}  } catch (error) {
        next(error)
    }
}


module.exports=Payment