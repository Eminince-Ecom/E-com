const mongoose=require('mongoose')
const productschema=mongoose.Schema({
name:{
     type:String,    
    required:true,
     trim:true
},
description:{
    type:String,
    required:true
},
price:{
type:Number,
required:true
},
images: [
    {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
],
rating:{
type:Number,
 required:true,   
},
category:{
    type:String,
    required:true
},
stock:{
    type:String,
    required:true
}

})


const Products=mongoose.model("Products",productschema)
module.exports=Products
// products schema 
