const express=require('express')
const {addProducts,getProducts,updateProducts,deleteProducts}=require('../Controller/Products')
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
    @url : /api/product/:id
    @fields : 
    @method : Get
    @access : PUBLIC
 */

router.get('/:id',getProducts)
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
    @fields : name,price,image,category,stock,rating
    @method : POST
    @access : PUBLIC
 */
   router.post('/addproduct',addProducts)



/*
    @usage : editproduct
    @url : /api/product/:id
    @fields :name,price,image,category,stock,rating
    @method : PUT
    @access : PUBLIC
 */

   router.put('/:id',updateProducts)



/*
    @usage : deleteproduct
    @url : /api/product/:id
    @fields : 
    @method : Delete
    @access : PUBLIC
 */

  router.delete('/:id',deleteProducts)





module.exports=router;