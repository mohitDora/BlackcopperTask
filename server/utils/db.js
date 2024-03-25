const mongoose=require("mongoose");

const URI="mongodb+srv://Mohitdora21:Mohitdora21@cluster0.knnixxr.mongodb.net/MERN?retryWrites=true&w=majority&appName=Cluster0"

const connectdb=async()=>{
    try {
        await mongoose.connect(URI);
        console.log("DB conected successfully")
    } catch (error) {
        console.log("DB connection failed");
        process.exit(0)
    }
}

module.exports=connectdb