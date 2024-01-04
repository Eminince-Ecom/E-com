const mongoose=require('mongoose')
const Cart=require('../Model/Cart')
const error=require('../Middleware/Error')
const Products=require("../Model/Products")
const { calculateItemPrice,calculateTotalPrice}=require('../Helper/Total')
const { findByIdAndDelete } = require('../Model/User')
const addtoCart = async (req, res, next) => {
    try {
        const { productId, quantity, userId } = req.body;
        let cart = await Cart.findOne({ userinfo: userId });

        if (!cart) {
            cart = new Cart({
                userinfo: userId,
                orderedItems: []
            });
        }
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (!cart.orderedItems) {
            cart.orderedItems = [];
            console.log("cart is empty")
        }
        cart.orderedItems.push({
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            rating: product.rating,
            stock: product.stock,
            quantity: quantity
        });
        cart.itemPrice = calculateItemPrice(cart.orderedItems);
        cart.totalPrice = calculateTotalPrice(cart.itemPrice, cart.shippingPrice, cart.taxPrice);

        await cart.save();
        res.status(201).json({ message: "Product Added Successfully" });
    } catch (error) {
        next(error);
    }
}
const getCart=async()=>{
    try {
    const userId=req.params.id   
    const cart=Cart.findOne({userinf0:userId}).populate('Ordereditems.products')
    res.status(200).json({message:cart})
    } catch (error) {
     console.log(error)
     next(error)
    }
    }

 const Orderform = {
        ShippingInfo: async (req, res, next) => {
          try {
            const shippingDetails = new Cart({
              ShippingInfo: req.body.ShippingInfo,
              OrderedItems: req.body.OrderedItems,
              userinfo: req.body.userinfo,
              paymentInfo: req.body.paymentInfo,
              status: req.body.status,
              paymentmethod: req.body.paymentmethod,
              orderstatus: req.body.orderstatus,
              itemprice: req.body.itemprice,
              totalprice: req.body.totalprice,
              shippingprice: req.body.shippingprice,
              taxprice: req.body.taxprice,
            });
      
            const savedShippingDetails = await shippingDetails.save();
            res.status(200).json({ message: "Order form submitted successfully", shippingDetails: savedShippingDetails });
          } catch (error) {
            next(error);
          }
        },
      };



const updateQuantity=async(req,res,next)=>{
    try {
        

    } catch (error) {
       next(error)
    }
}


const deleteItems=async(req,res,next)=>{
const productId=req.params.id
    try {
     const deletedproduct=await Cart.findByIdAndDelete(productId)
     if(!deletedproduct){
    console.log("Inavlid ProductId")
    res.status(400).json({message:"Invalid ProductId"})
     } 
    res.status(200).json({message:"Product removed from cart Succsesfully "})
    } catch (error) {
       next(error) 
    }
}


module.exports={
addtoCart,getCart,Orderform
,deleteItems

}

