const express=require('express')
const RegisterUser=require('../Controller/Users')
const LoginUser=require('../Controller/Users')
const router=express.Router()

/*
    @usage : allproductts
    @url : /api/product/allproducts
    @fields : 
    @method : Get
    @access : PUBLIC
 */

//router.get('/allproducts',allproducts)

/*
    @usage : getproduct
    @url : /api/product/getproduct/:id
    @fields : 
    @method : Get
    @access : PUBLIC
 */

//router.get('/product',product)
/*
    @usage : getproductcategory
    @url : /api/product/getproductcategory
    @fields : 
    @method : Get
    @access : PUBLIC
 */

//router.get('/getproductbycategory',getproductCategory)



// Admin Api's 

/*
    @usage : addproduct
    @url : /api/product/addproduct
    @fields : Productname,productprice,productimage,productcategory,productquantity,productrating
    @method : POST
    @access : PUBLIC
 */

  //  router.post('/addproduct',addproduct)



/*
    @usage : editproduct
    @url : /api/product/editproduct/:id
    @fields : Productname,productprice,productimage,productcategory,productquantity,productrating
    @method : PUT
    @access : PUBLIC
 */

  //  router.put('/editproduct/:id',editproduct)



/*
    @usage : deleteproduct
    @url : /api/product/deleteproduct/:id
    @fields : 
    @method : Delete
    @access : PUBLIC
 */

  //  router.delete('/deleteproduct/:id',deleteproduct)





module.exports=router;