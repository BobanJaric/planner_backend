const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const aircrafts= new Schema({
    aircraft:{ type:String, required:true},
    callsign:{ type:String, required:true},
    type:{ type:String, required:true},
    mtow:{ type:String, required:true},
    totalTime: {type: String },
    nextMaintenance: {type: String },
    startMaintenance: {type: String },
    endMaintenance: {type: String },
    creator: { type:mongoose.Types.ObjectId, required: true , ref : 'User'} 
    
});

module.exports= mongoose.model('Aircrafts', aircrafts);