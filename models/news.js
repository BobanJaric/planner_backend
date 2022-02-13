const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const newsShema= new Schema({
    info:{ type:String, required:true},
    headline :{ type:String },
    country:{ type:String },
    city:{ type:String },
    category:{ type:String },
    creator: { type:mongoose.Types.ObjectId, required: true , ref : 'User'} 
    
}, { timestamps: { createdAt: 'created_at' } });

module.exports= mongoose.model('New', newsShema);