//const stripekey=process.env.STRIPE
const stripe= require('stripe')('sk_test_51O27J8SHyVL8vTbEKHhWFToihuDa0td3BWa3mPAPwIPr9Wm2h45IEbGffUT0ceA6XnyFsRnRUFKh7VtocTQe9b8E00Lxt2jY0U')
const PaymentModel=require('../Model/Payment')
const cartModel= require('../Model/Cart')
//const { findById } = require('../Model/User')
const razorpay=require('../Middleware/Razorpay')
const paymentsR= async (req, res, next) => {
    try {
      const amount = 50000;
      const currency = "INR";
      const options = {
        amount,
        currency,
        receipt: "order Payment",
        payment_capture: 1, // Set to 1 to capture the payment immediately
      };
  
      const response = await razorpay.orders.create(options);
      if (response.error) {
        console.error(response.error, "this is the error");
        return res.status(500).json({ message: "Payment failed", error: response.error });
      }

      // Capture the payment immediately after order creation
      const captureResponse = await razorpay.payments.capture(response.payments[0].id, amount);
      if (captureResponse.error) {
        console.error(captureResponse.error, "this is the capture error");
        return res.status(500).json({ message: "Payment capture failed", error: captureResponse.error });
      }
  
      res.json({ message: "Payment successful", response });
    } catch (error) {
      console.log(error);
      next(error);
    }
};


const Payment = async (req, res, next) => {
    const cartId = req.body;
try {
let paymentMethod= await stripe.paymentMethods.create({
    type:"card",
    card:{
     number:"4242424242424242",
     exp_month:"9",
     exp_year:"2024",
     cvc:"314"
    }
})
let paymentIntent= await stripe.paymentIntent.create({
    payment_method:paymentMethod.id,
    amount:75,
    currency:inr,
    confirm:true,
    payment_method_types:['card']
})

res.send(paymentIntent)
await paymentIntent.save()
} catch (error) {
    next(error)
}}

module.exports=paymentsR