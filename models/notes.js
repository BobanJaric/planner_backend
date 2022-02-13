const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const notesShema= new Schema({
    date:{ type:String, required:true},
    note:{ type:String }
    
});

module.exports= mongoose.model('Note', notesShema);