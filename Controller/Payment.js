// //const stripekey=process.env.STRIPE
// //const stripe= require('stripe')('sk_test_51O27J8SHyVL8vTbEKHhWFToihuDa0td3BWa3mPAPwIPr9Wm2h45IEbGffUT0ceA6XnyFsRnRUFKh7VtocTQe9b8E00Lxt2jY0U')
// const PaymentModel=require('../Model/Payment')
// const Cart= require('../Model/Cart')
// //const { findById } = require('../Model/User')
// const razorpay=require('../Middleware/Razorpay')
// const paymentsR= async (req, res, next) => {
//   try {
//       const { cartId } = req.body; // Assuming cartId is sent in the request body

//       if (!cartId) {
//           return res.status(400).json({ message: "Cart ID is required" });
//       }

//       const amount = 50000;
//       const currency = "INR";
//       const options = {
//           amount,
//           currency,
//           receipt: "order Payment",
//           payment_capture:0, // Set to 1 to capture the payment immediately
//       };

//       const response = await razorpay.orders.create(options);
//       console.log("Razorpay API Response:", response); // Log the entire response

//       if (response.error) {
//           console.error(response.error, "this is the error");
//           return res.status(500).json({ message: "Payment failed", error: response.error });
//       }
//       if (response.payments && Array.isArray(response.payments) && response.payments.length > 0) {
//           const captureResponse = await razorpay.payments.capture(response.payments[0].id, amount);

//           if (captureResponse.error) {
//               console.error(captureResponse.error, "this is the capture error");
//               return res.status(500).json({ message: "Payment capture failed", error: captureResponse.error });
//           }
//           await Cart.findByIdAndUpdate(cartId, { paymentstatus: "paid" });
//           const paymentDetails = {
//               cartId,
//               amount,
//               currency,
//               paymentId: captureResponse.id,
//           };
//           const payment = new Payment(paymentDetails);
//           await payment.save();

//           res.json({ message: "Payment successful", response });
//       } else {
//           console.error("No valid payments found in the response");
//           return res.status(500).json({ message: "Payment failed", error: "No valid payments found in the response" });
//       }
//   } catch (error) {
//       console.log(error);
//       next(error);
//   }
// };

const Razorpay = require('razorpay');
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_YxKDPByiDYVh4W",
    key_secret: "qWQu0rFSFUvO7h0NWT23XmXG"
});

const renderProductPage = async (req, res) => {
    try {
        res.render('product');
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const createOrder = async (req, res) => {
    try {
        const amount = req.body.amount * 100;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.error(err);
                return res.status(400).send({ success: false, msg: err });
            }

            res.status(200).send({
                success: true,
                msg: 'Order Created',
                order_id: order.id,
                amount: amount,
                key_id: RAZORPAY_ID_KEY,
                product_name: req.body.name,
                description: req.body.description,
                contact: "8567345632",
                name: "Sandeep Sharma",
                email: "sandeep@gmail.com"
            });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { renderProductPage, createOrder };


// const Payment = async (req, res, next) => {
//     const cartId = req.body;
// try {
// let paymentMethod= await stripe.paymentMethods.create({
//     type:"card",
//     card:{
//      number:"4242424242424242",
//      exp_month:"9",
//      exp_year:"2024",
//      cvc:"314"
//     }
// })
// let paymentIntent= await stripe.paymentIntent.create({
//     payment_method:paymentMethod.id,
//     amount:75,
//     currency:inr,
//     confirm:true,
//     payment_method_types:['card']
// })

// res.send(paymentIntent)
// await paymentIntent.save()
// } catch (error) {
//     next(error)
// }}

// module.exports=paymentsR