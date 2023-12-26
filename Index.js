const express =require('express')
const cors=require('cors')
const {updateData} =require('./database/connection')
const app=express()
const dotenv=require('dotenv')


//Middlewares
app.use(express.json())
app.use(cors())
//const errorMiddleware=require('./Middleware/Error')
dotenv.config()
const port=process.env.PORT
 
app.get('/', (req, res) => {
   res.send('Welcome to the home page!');
 });


async function main(){
   await updateData();
 
}
//main();



app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
