const express =require('express')
const cors=require('cors')
const Connection=require('./Database/Database')

const app=express()
const dotenv=require('dotenv')

//const errorMiddleware=require('./Middleware/Error')
dotenv.config()

 

//Middlewares
app.use(express.json())
app.use(cors())



Connection()

const port=process.env.PORT
app.listen(()=>console.log(`server is running  http://localhost:${port}`))