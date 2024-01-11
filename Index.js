const express =require('express')
const cors=require('cors')
const Connection=require('./Database/Database')
const Users=require('../Server/Routes/Users')
const Products=require('./Routes/Products')
const Cart=require('./Routes/Cart')
const Payment=require("./Routes/Payment")
const app=express()
require("dotenv").config();
const dotenv=require('dotenv')
const path = require('path');
const errorMiddleware=require('../Server/Middleware/Error')
//Middlewares
app.use(express.json())


app.use(cors())
//const errorMiddleware=require('./Middleware/Error')
dotenv.config()
const port=process.env.PORT
 
app.get('/', (req, res) => {
   res.send('Welcome to the home page!');
 });

 

//Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/users',Users)
app.use('/api/product',Products)
app.use('/api/cart',Cart)
app.use('/api/payment',Payment)
app.use(errorMiddleware)

//Database Connection
Connection()


console.log(process.env.API_KEY)
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
