const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const arhivesShema= new Schema({
    date:{ type:String, required:true},
    registration:{ type:String, required:true},
    from: {type:String, required:true },
    to: {type: String, required:true },
    etd: {type: String, required:true  },
    eta: {type: String , required:true },
    block:{ type:String, required:true },
    msp:{ type:String , required:true},
    pax:{ type:String, required:true },
    capt:{ type:String, required:true },
    fo:{ type:String, required:true },
    fa:{ type:String , required:true},
    length:{ type:String, required:true },
    broker:{ type:String, required:true },
    /* creator: { type:mongoose.Types.ObjectId, required: true , ref : 'User'}  */
    
});

module.exports= mongoose.model('Arhive', arhivesShema);