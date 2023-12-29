const mongoose= require('mongoose')

const imageSchema = mongoose.Schema({
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  });
  

const productschema=mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true
},
price:{
    type:Number,
    required:true,
    maxLength:8
},
    description:{
          type:String,
         required:true
},
ratings:{
     type:Number,
     default:0
},
images: [imageSchema], 
category:{
       type:String,
       required:true
},
stock:{
required:true,
default:10
}

})


const Products=mongoose.model("Products",productschema)
module.exports=Products