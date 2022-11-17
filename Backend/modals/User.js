const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type : Number,
        unique: true,
        required : true
    },
    pincode:{
        type : Number,
        required : true
    },
    zone:{
        type : String,
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

module.exports = mongoose.model('user',UserSchema);