const Razorpay=require('razorpay')
//const{id,secret}=require('../config')

const razorpay = new Razorpay({
    key_id:'rzp_test_Im7bzb0Mnrt4LY',
    key_secret:'ckt8HlSnRBDCdvmtIsZo2Lvv',
  });


  module.exports=razorpay;