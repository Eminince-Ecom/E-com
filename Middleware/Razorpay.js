const Razorpay=require('razorpay')
//const{id,secret}=require('../config')

const razorpay = new Razorpay({
    key_id:'rzp_test_nNanLlT7282wLA',
    key_secret:process.env.RAZORKEYSECRET,
  });



  module.exports=razorpay;