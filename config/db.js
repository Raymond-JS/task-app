const mongoose = require("mongoose")

// Connect to DB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
             });
      console.log(`Connected to MONGO database: ${conn.connection.host} `) 

    } catch(error) {
        console.error(`Error: ${error.message}`)
        process.exit();
    }
} 
 
 
module.exports = connectDB