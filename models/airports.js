const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const airportsShema= new Schema({
    icao:{ type:String, required:true},
    iata:{ type:String, required:true},
    country: {type:String, required:true },
    city: {type: String, required:true },
    hendler1: {type: String  },
    hendler2: {type: String  },
    hendler3:{ type:String },
    hendler4:{ type:String },
    hendler5:{ type:String },
    utc:{ type:String },
    vip:{ type:String },
    doz:{ type:String },
    slot:{ type:String },
    note:{ type:String },
    meetingpoint:{ type:String },
    longitude:{ type:String },
    latitude:{ type:String }
    
});

module.exports= mongoose.model('Airport', airportsShema);