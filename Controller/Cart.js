const mongoose=require('mongoose')
const Cart=require('../Model/Cart')
const errorMiddleware=require('../Middleware/Error')


const addtoCart=async(req,res,next)=>{   
try {
const {productId,quantity}=req.body
const {userId}=req.user.id
let cart=Cart.findOne({userinfo:userId})
} catch (error) {
  next(error)
}
}

const  Orderform=async(req,res,next)=>{
    try {
        
    } catch (error) {
       console.log(error,'In orderform') 
       next(error) 
    }
}

const getCart=async()=>{
    try {
        
    } catch (error) {
     console.log(error)
    }
}


const deleteItems=async()=>{
    try {
        
    } catch (error) {
        
    }
}


module.exports={
addtoCart,getCart,Orderform
,deleteItems

}

