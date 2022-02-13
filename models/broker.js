const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const brokerShema= new Schema({
    brokerName:{ type:String, required:true},
    company:{ type:String },
    telephone:{ type:String },
    email:{ type:String },
    creator: { type:mongoose.Types.ObjectId, required: true , ref : 'User'} 
    
});

module.exports= mongoose.model('Broker', brokerShema);