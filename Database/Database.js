const mongoose=require('mongoose')
const url=process.env.URL
const Url=`mongodb+srv://aryantrivedieminence:l9A1HIQJw9WFewJN@chatapp.jve0xaf.mongodb.net/`;

const Connection=async()=>{
  try {
    await mongoose.connect(Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected Successfully',url)
  } catch (error) {
    console.log("Failure in database Connection")
  }
}

  module.exports = Connection
  

