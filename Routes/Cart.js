const express=require('express')
const RegisterUser=require('../Controller/Users')
const LoginUser=require('../Controller/Users')
const router=express.Router()

/*
    @usage : getcartitems
    @url : /api/cart/getcartitems
    @fields : 
    @method : Get
    @access : PUBLIC
 */

router.get('/getcartitems',getcartitems)

/*
    @usage : updatequantity
    @url : /api/cart/updatequantity
    @fields : productId,quantity
    @method : Post
    @access : PUBLIC
 */

router.put('/updatequantity',updatequantity)
/*
    @usage : addtocart
    @url : /api/cart/addtocart
    @fields : ProductId
    @method : POST
    @access : PUBLIC
 */

router.post('/addtocart',addtocart)
/*
    @usage : removeproduct
    @url : /api/product/removeproduct
    @fields : productid,
    @method : Delete
    @access : PUBLIC
 */

 router.delete('/removefromcart',removefromcart)
    /*
        @usage :orderedcart
        @url : /api/product/orderedcart
        @fields : 
        @method : POST
        @access : PUBLIC
     */

router.post('/orderedcart',orderedcart)
 
  /*
        @usage :getbill
        @url : /api/product/getbill
        @fields : 
        @method : GET
        @access : PUBLIC
     */

   
 router.get('/getbill',getbill)   





module.exports=Cart;