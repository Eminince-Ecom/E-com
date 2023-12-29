const Products=require("../Model/Products")



const  addProducts=async(req,res)=>{
    try {
     const newProduct= new Products({
     name:req.body.name,
     description:req.body.description,
     price:req.body.price,
     image:req.body.image,
     category:req.body.category,
     ratings:req.body.ratings,
     stock:req.body.stock

     })   
     await newProduct.save()
     res.status(200).json({message:"Product added Successfully"})


    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error in Add Products Api",Error})
    }
}



const  getProducts=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error in Add Products Api",Error})
    }
}





const  updateProducts=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error in Add Products Api",Error})
    }
}





const  deleteProducts=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error in Add Products Api",Error})
    }
}




module.exports={
    addProducts,getProducts,
    updateProducts,deleteProducts
}