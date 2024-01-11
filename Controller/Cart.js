const mongoose=require('mongoose')
const Cart=require('../Model/Cart')
const error=require('../Middleware/Error')
const Products=require("../Model/Products")
const User=require('../Model/User')
const { calculateItemPrice,calculateTotalPrice}=require('../Helper/Total')
const { findByIdAndDelete } = require('../Model/User')
const addtoCart = async (req, res, next) => {
  const requiredFields = ['productId', 'quantity', 'userId'];
  for (const field of requiredFields) {
      if (!req.body[field]) {
          return res.status(400).json({ message:`Missing ${field} in the request body. Please fill in all the required fields.` });
      }
  }

    try {
        const { productId, quantity, userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
          return res.status(400).json({ error: "Invalid product ID. Please enter a valid ID." });
        }
        let cart = await Cart.findOne({ userinfo: userId });
         
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const user= await User.findById(userId)
        if(!user){
            res.status(401).json({message:"User Not Found"})
            return
        }
        if (!cart) {
            cart = new Cart({
            orderedItems:[{product:productId,quantity}],
            userinfo:userId,
            paymentstatus: 'pending',
            paymentmethod: 'Online',
            orderstatus: 'processing',
            taxprice: 18,
            shippingprice: 0, 
            totalprice: 0, 

            });
        }else{
        const existingItem=cart.orderedItems.find(item=>item.product.equals(productId))
        if(existingItem){
        existingItem.quantity +=quantity
        }else{
            cart.orderedItems.push({product,quantity})
        }}
           //here we will calculate the total price
           const itemPrice = calculateItemPrice(cart.orderedItems);
           cart.totalprice = calculateTotalPrice(itemPrice, cart.shippingprice, cart.taxprice);
           console.log(cart.totalprice);
        await cart.save();
        res.status(201).json({ message:"Product Added Successfully"});
    } catch (error) {
        next(error);
    }
}
const getCart=async(req,res,next)=>{
  const cartId=req.params.id   

  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({ error: "Invalid  ID. Please enter a valid ID." });
  }
    try {
    const cart= await Cart.findById(cartId)
    res.status(200).json({message:cart})
    } catch (error) {
     console.log(error)
     next(error)
    }
    }


    const updateQuantity = async (req, res, next) => {
        const userId = req.params.userId; 
        const productId = req.params.productId; 
        const newQuantity = req.body.quantity;
    
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid userId or productId. Please enter valid IDs." });
        }
    
        try {
            if (newQuantity === undefined || newQuantity === null) {
                return res.status(400).json({ message: "Please provide the 'quantity' in the request body" });
            }
            const userCart = await Cart.findOne({ userinfo: userId });
            if (!userCart) {
                res.status(401).json({ message: "User Cart Does Not Exist" });
                return;
            }
            const productIndex = userCart.orderedItems.findIndex((item) => item.product.equals(productId));
    
            if (productIndex === -1) {
                res.status(404).json({ message: "Product not found in the cart" });
                return;
            }userCart.orderedItems[productIndex].quantity = newQuantity;
            await userCart.save();
    
            res.status(200).json({ message: "Cart updated successfully" });
        } catch (error) {
            next(error);
        }
    };
    
  

const deleteItems = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;


  if (!mongoose.Types.ObjectId.isValid(userId || productId) ) {
    return res.status(400).json({ error: "Invalid  ID. Please enter a valid ID." });
  }
  try {
    const userCart = await Cart.findOne({ userinfo: userId });
    if (!userCart) {
      return res.status(404).json({ message: "User's cart not found" });
    }
    const productIndex = userCart.orderedItems.findIndex(
      (item) => item.product.equals(productId)
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
    userCart.orderedItems.splice(productIndex, 1);
    await userCart.save();
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    next(error);
  }
};
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
module.exports={
addtoCart,getCart,Orderform
,deleteItems,updateQuantity}

