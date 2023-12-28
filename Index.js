const express =require('express')
const cors=require('cors')
//const port=5000
const Connection=require('./Database/Database')
const Users=require('../Server/Routes/Users')
const app=express()
require("dotenv").config();
const dotenv=require('dotenv')
const path = require('path');

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

Connection()

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
