const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const caasShema= new Schema({
    country:{ type:String, required:true},
    permit:{ type:String},
    contact: {type:String },
    workingHours: {type: String },
    leadingTime: {type: String },
    validity: {type: String },
    note: {type: String },
    utc: {type: String },
    api: {type: String},
    covid: {type: String},
     creator: { type:mongoose.Types.ObjectId, required: true , ref : 'User'}  
    
});

module.exports= mongoose.model('Caa', caasShema);