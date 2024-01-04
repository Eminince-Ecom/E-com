const express=require('express')
const {addtoCart,getCart,Orderform}=require('../Controller/Cart')
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
    @url : /api/cart/getcartitems
    @fields : 
    @method : Get
    @access : PUBLIC
 */

router.get('/getcartitems',getCart)
/*
    @usage : updatequantity
    @url : /api/cart/updatequantity
    @fields : productId,quantity
    @method : Post
    @access : PUBLIC
 */

//router.put('/updatequantity',updatequantity)

/*
    @usage : removeproduct
    @url : /api/product/removeproduct
    @fields : productid,
    @method : Delete
    @access : PUBLIC
 */

 //router.delete('/removefromcart',removefromcart)
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