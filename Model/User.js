const mongoose=require('mongoose')
const Schema=mongoose.Schema


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      
    },
    avatar: {
      type: String,
    },
    userrole: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    contactNo: {
      type: Number,
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
          },
          quantity: {
            type: Number,
            default: 1,
          },
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  


const User=mongoose.model("User",userSchema)
module.exports=User;