const mongoose =require('mongoose')
const { Schema } = mongoose;

const RequestsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    time:{
        type: String,
        required: true
    },
    date:{
        type : String,
        required : true
    },
    wasteType:{
        type: String,
        required:true
    },
    pincode:{
        type : Number,
        required : true
    },
    zone:{
        type : String,
        required : true
    },
    amount:{
        type : Number,
        required : true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
  });

module.exports = mongoose.model('requests',RequestsSchema);