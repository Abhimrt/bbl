const mongoose = require('mongoose');
const { Schema } = mongoose;

const DriverSchema = new Schema({
    zone:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true
    },
    truckID:{
        type : String,
        unique: true,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
  });

module.exports = mongoose.model('driver',DriverSchema);