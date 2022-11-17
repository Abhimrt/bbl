const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://yabhi251202:H0XBGmpy3snsRdHc@bbl.oijuysp.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Server Successfully...")
    })
}

module.exports = connectToMongo


// mongodb+srv://yabhi251202:<password>@bbl.oijuysp.mongodb.net/?retryWrites=true&w=majority