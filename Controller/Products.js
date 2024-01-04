const Products=require("../Model/Products")
const cloudinary=require('../Middleware/Cloudinary')
const err=require('../Middleware/Error')
const  addProducts=async(req,res,next)=>{
    try {
      const result= await cloudinary.uploader.upload(req.body.image,{folder:'productimages'})
      console.log(("6")) 
     const newProduct= new Products({
     name:req.body.name,
     description:req.body.description,
     price:req.body.price,
    image:process.env.CLOUDINARYURL,
     category:req.body.category,
     rating:req.body.rating,
     stock:req.body.stock
     })   
     await newProduct.save()
     res.status(200).json({message:"Product added Successfully"})

    } catch (err) {
        next(err)
    }

}
const  getProducts=async(req,res)=>{
const productId=req.params.id
try {
 const product=await Products.findById(productId)
 if(!product){
    res.status(500).json({message:"Product does Not Exists"})
 }
res.status(200).json({message:product})
 } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error in Add Products Api",Error})
    }
}



const updateProducts = async (req, res) => {
    const productId = req.params.id;
  
    try {
      const product = await Products.findByIdAndUpdate(
        productId,
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: req.body.image,
          category: req.body.category,
          rating: req.body.rating,
          stock: req.body.stock,
        },
        { new: true } 
      );
        await product.save();
  
      res.status(200).json({ message: 'Product updated successfully', updatedProduct: product });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Error in Update Product API', error });
    }
  };



  const  deleteProducts=async(req,res)=>{
    const userID=req.params.id
    try {   
   const deletedProduct=Products.findByIdAndDelete(userID)
   res.status(200).json({message:"Product Deleted Successfully",deleteProducts})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error in Add Products Api",Error})
    }
}


 const getAll=async()=>{
  try {
  const getallproducts=Products.find()
  res.status(200).json({messsage:getAll})
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Error in  the Api"})
  }
 }

module.exports={
    addProducts,getProducts,
    updateProducts,deleteProducts,getAll
}