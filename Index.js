const express =require('express')
const cors=require('cors')
const Connection=require('./Database/Database')
const Users=require('../Server/Routes/Users')
const Products=require('./Routes/Products')
const Cart=require('./Routes/Cart')
const paymentRoute=require('../Server/Routes/Payment')
const app=express()
require("dotenv").config();
var http = require('http').Server(app);

const dotenv=require('dotenv')
const path = require('path');
const errorMiddleware=require('../Server/Middleware/Error')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Middlewares
app.use(express.json())
app.use(cors())
//const errorMiddleware=require('./Middleware/Error')
dotenv.config()
const port=process.env.PORT
app.get('/', (req, res) => {
  res.render('products');
});
//Middlewares
app.use(express.json())
app.use(cors())
// Routes
app.use('/api/users',Users)
app.use('/api/product',Products)
app.use('/api/cart',Cart)
app.use('/api/payment',paymentRoute)
app.use(errorMiddleware)


// app.post('/',(req,res)=>{
// res.sendFile("Standard.html",{root:{__dirname}})
// })



// app.post("/create/orderId",(req,res)=>{
//   console.log("order")
// const options={
//     "amount": req.body.amount,
//     "currency": "INR",
//     "receipt": "order_Payment",
//   }
//   instance.orders.create(options,function(err,order){
// res.send({orderId:order.id})
//   })
// })

//Database Connection
Connection()
console.log(process.env.STRIPE)
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
