const mongoose =require('mongoose')
const Products = require('./Products')
const User =require('../Model/User')
const cartitemSchema=mongoose.Schema({
product:{
type:mongoose.Schema.ObjectId,
ref:Products,
required:true
},
quantity:{
type:Number,
required:true,
default:1    
}})
const cartSchema=mongoose.Schema({
orderedItems:[cartitemSchema],
userinfo:{
    type:mongoose.Schema.ObjectId,
    ref:User,
    required:true
},
paymentstatus:{
type:String,
required:true
},
paymentmethod:{
 type:String,
 required:true,
 default:"Online"
  },
orderstatus:{
 type:String,
  required:true,
  default:"processing"
 },taxprice:{
 type:Number,
 required:true,
 default:18
 },shippingprice:{
  type:Number,
  required:true
  },taxprice:{
   type:Number,
   required:true
   },
   totalPrice:{
    type:Number,
   
   }
})
const Cart=mongoose.model("Cart",cartSchema)
module.exports=Cart