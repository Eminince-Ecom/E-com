const errorMiddleware=(req,res,next,err)=>{
    console.log(err)
    res.status(500).json({message:"Internal server error"})
}

module.exports=errorMiddleware