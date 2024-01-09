const mongoose=require('mongoose')
const Connection=async()=>{
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: 'majority', wtimeout: 1000 }
    });
    console.log('Database Connected Successfully',)
  } catch (err) {
    console.log(err,"---- Failure in database Connection   ----")
  }
}

  module.exports = Connection
// This is DB connection  file - >
