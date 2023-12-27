const express =require('express')
const cors=require('cors')
<<<<<<< HEAD
const port=5000
const Connection=require('./Database/Database')
const Users=require('../Server/Routes/Users')
=======
const {updateData} =require('./database/connection')
>>>>>>> a659e423d78bc4875889d0ada434a9af481834a1
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

<<<<<<< HEAD
//Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/',Users)

Connection()

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
=======
 

 app.get('/api', (req, res) => {
   res.sendFile(path.join(__dirname,'Controller', 'Apiinfo.html'));
});


async function main(){
   await updateData();
 
}
main();



app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
>>>>>>> a659e423d78bc4875889d0ada434a9af481834a1
