const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/VoyageVista";

const connectToMongo =()=>{
    try{
        mongoose.connect(mongoURI);
        console.log("Connected Successfully");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;