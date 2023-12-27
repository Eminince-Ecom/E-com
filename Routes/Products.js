const express=require('express')
const RegisterUser=require('../Controller/Users')
const LoginUser=require('../Controller/Users')
const router=express.Router()



router.get('/allproducts',allproducts)

/*
    @usage : allproductts
    @url : /api/product/allproducts
    @fields : 
    @method : Get
    @access : PUBLIC
 */



router.get('/product',product)
/*
    @usage : getproduct
    @url : /api/product/getproduct/:id
    @fields : 
    @method : Get
    @access : PUBLIC
 */

router.get('/getproductbycategory',getproductCategory)

/*
    @usage : getproductcategory
    @url : /api/product/getproductcategory
    @fields : 
    @method : Get
    @access : PUBLIC
 */

// Admin Api's 
router.post('/addproduct',addproduct)
/*
    @usage : addproduct
    @url : /api/product/addproduct
    @fields : Productname,productprice,productimage,productcategory,productquantity,productrating
    @method : POST
    @access : PUBLIC
 */

   

    router.put('/editproduct/:id',editproduct)

/*
    @usage : editproduct
    @url : /api/product/editproduct/:id
    @fields : Productname,productprice,productimage,productcategory,productquantity,productrating
    @method : PUT
    @access : PUBLIC
 */

   


    router.delete('/deleteproduct/:id',deleteproduct)
/*
    @usage : deleteproduct
    @url : /api/product/deleteproduct/:id
    @fields : 
    @method : Delete
    @access : PUBLIC
 */







module.exports=Product;