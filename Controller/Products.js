const Products=require("../Model/Products")
const mongoose=require('mongoose')
const cloudinary=require('../Middleware/Cloudinary')
const err=require('../Middleware/Error')
const addProducts = async (req, res, next) => {
  try {
      if (!Array.isArray(req.body.images)) {
          return res.status(400).json({ message: 'Images should be an array' });
      }

      const images = [];

      for (const imageObject of req.body.images) {
          if (imageObject.url && typeof imageObject.url === 'string') {
              const result = await cloudinary.uploader.upload(imageObject.url, { folder: 'productimages' });

              images.push({
                  public_id: result.public_id,
                  url: result.secure_url
              });
          }
      }

      const newProduct = new Products({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: process.env.CLOUDINARYURL,
          images: images,
          category: req.body.category,
          rating: req.body.rating,
          stock: req.body.stock
      });

      await newProduct.save();
      res.status(200).json({ message: "Product added Successfully" });

  } catch (err) {
      next(err);
  }
};



const updateProducts= async (req, res, next) => {
    const productId = req.params.id;
 if (!mongoose.Types.ObjectId.isValid(productId )) {
    return res.status(400).json({ error: "Invalid user ID. Please enter a valid ID." });
  }
  try {
   
      // Check if the product exists
      const existingProduct = await Products.findById(productId);

      if (!existingProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      let newImages = existingProduct.images;
      if (req.body.images && Array.isArray(req.body.images)) {
          newImages = await Promise.all(req.body.images.map(async (image) => {
              if (image.url) {
                  const result = await cloudinary.uploader.upload(image.url, { folder: 'productimages' });
                  return {
                      public_id: result.public_id,
                      url: result.secure_url
                  };
              } else {
                  return image; 
              }
          }));
      }


      existingProduct.name = req.body.name || existingProduct.name;
      existingProduct.description = req.body.description || existingProduct.description;
      existingProduct.price = req.body.price || existingProduct.price;
      existingProduct.category = req.body.category || existingProduct.category;
      existingProduct.rating = req.body.rating || existingProduct.rating;
      existingProduct.stock = req.body.stock || existingProduct.stock;
      existingProduct.images = newImages;
      await existingProduct.save();

      res.status(200).json({ message: 'Product updated successfully', updatedProduct: existingProduct });
  } catch (error) {
      next(error);
  }
};

  const  getProducts=async(req,res)=>{
    const productId=req.params.id
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "Invalid user ID. Please enter a valid ID." });
      }
    try {
     const product=await Products.findById(productId)
     if(!product){
        res.status(500).json({message:"Product does Not Exists"})
        return
     }
    res.status(200).json({message:product})
     } catch (error) {
            console.log(error)
            res.status(400).json({message:"Error in Add Products Api",Error})
        }
    }

  const  deleteProducts=async(req,res)=>{
    const userID=req.params.id

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({ error: "Invalid user ID. Please enter a valid ID." });
      }
    try {   
   const deletedProduct= await Products.findByIdAndDelete(userID)
   console.log(deletedProduct)
   res.status(200).json({message:"Product Deleted Successfully",deletedProduct})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error in Delete Products Api",Error})
    }
}


 const getAll=async(req,res,next)=>{
  try {
  const getallproducts= await Products.find()
  console.log(getallproducts)
  res.status(200).json({products:getallproducts})
  } catch (error) {
    console.log(error)
    res.status(400).json({message:"Error in  the Api"})
  }
 }

module.exports={
    addProducts,getProducts,
    updateProducts,deleteProducts,getAll
}