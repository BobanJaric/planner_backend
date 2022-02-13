const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const crew= new Schema({
    rank: {type: String, required:true },
    rankNbr: {type: String, required:true },
    fullname:{ type:String, required:true},
    dob:{ type:String, required:true},
    nationality: {type:String, required:true },
    passport: {type: String, required:true },
    passportValidity: {type: String },
    licenceNbr: {type: String },
    opc: {type: String },
    lpc: {type: String },
    totalHours: {type: String },
    workingFrom: {type: String }    
});

module.exports= mongoose.model('Crew', crew);