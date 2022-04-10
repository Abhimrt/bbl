const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/SIH?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Server Successfully...")
    })
}
module.exports = connectToMongo