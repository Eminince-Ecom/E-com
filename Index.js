const express =require('express')
const cors=require('cors')
const port=5000
const Connection=require('./Database/Database')
const Users=require('../Server/Routes/Users')
const app=express()
require("dotenv").config();
const dotenv=require('dotenv')

//const errorMiddleware=require('./Middleware/Error')
dotenv.config()

//Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/',Users)

Connection()

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
