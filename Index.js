const express =require('express')
const cors=require('cors')
const {updateData} =require('./database/connection')
const { Pool } = require('pg');
const app=express()
const dotenv=require('dotenv')

//const errorMiddleware=require('./Middleware/Error')
dotenv.config()

 

async function main(){
   await updateData();
 
}
main();
//Middlewares
app.use(express.json())
app.use(cors())

const port=process.env.PORT
app.listen(()=>console.log(`server is running  http://localhost:${port}`))