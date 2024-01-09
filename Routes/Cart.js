const express=require('express')
const {addtoCart,getCart,Orderform, deleteItems,updateQuantity}=require('../Controller/Cart')
const router=express.Router()
/*
    @usage : addtocart
    @url : /api/cart/addtocart
    @fields : ProductId
    @method : POST
    @access : PUBLIC
 */

router.post('/addtocart',addtoCart)
/*
    @usage : getcartitems
    @url : /api/cart/getcart
    @fields : 
    @method : Get
    @access : PUBLIC
 */

router.get('/:id',getCart)
/*
    @usage : updatequantity
    @url : /api/cart/updatequantity
    @fields : productId,quantity
    @method : Post
    @access : PUBLIC
 */

router.put('/:userId/:productId/:quantity',updateQuantity)

/*
    @usage : removeproduct
    @url : /api/product/removeproduct
    @fields : productid,
    @method : Delete
    @access : PUBLIC
 */

 router.delete('/:userId/:productId',deleteItems)
    /*
        @usage :orderedcart
        @url : /api/product/orderedcart
        @fields : 
        @method : POST
        @access : PUBLIC
     */

//router.post('/orderedcart',orderedcart)
 
  /*
        @usage :getbill
        @url : /api/product/getbill
        @fields : 
        @method : GET
        @access : PUBLIC
     */

   
//router.get('/getbill',getbill)   



  /*
        @usage :orderform
        @url : /api/cart/orderform
        @fields : 
        @method : POST
        @access : PUBLIC
     */ 
router.post('/orderform',Orderform.ShippingInfo)   





module.exports=router;