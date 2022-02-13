const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const handlingShema= new Schema({
    hnd1:{ type:String, required:false},
    slot1:{ type:String, required:false},
    doz1:{ type:String, required:false},
    ovf1:{ type:String, required:false},
    vip1:{ type:String, required:false},
    hnd2:{ type:String, required:false},
    slot2:{ type:String, required:false},
    doz2:{ type:String, required:false},
    ovf2:{ type:String, required:false},
    vip2:{ type:String, required:false},
    hnd3:{ type:String, required:false},
    slot3:{ type:String, required:false},
    doz3:{ type:String, required:false},
    ovf3:{ type:String, required:false},
    vip3:{ type:String, required:false},
    hnd4:{ type:String, required:false},
    slot4:{ type:String, required:false},
    doz4:{ type:String, required:false},
    ovf4:{ type:String, required:false},
    vip4:{ type:String, required:false},
    hnd5:{ type:String, required:false},
    slot5:{ type:String, required:false},
    doz5:{ type:String, required:false},
    ovf5:{ type:String, required:false},
    vip5:{ type:String, required:false},
    hnd6:{ type:String, required:false},
    slot6:{ type:String, required:false},
    doz6:{ type:String, required:false},
    ovf6:{ type:String, required:false},
    vip6:{ type:String, required:false},
    hnd7:{ type:String, required:false},
    slot7:{ type:String, required:false},
    doz7:{ type:String, required:false},
    ovf7:{ type:String, required:false},
    vip7:{ type:String, required:false},
    hnd8:{ type:String, required:false},
    slot8:{ type:String, required:false},
    doz8:{ type:String, required:false},
    ovf8:{ type:String, required:false},
    vip8:{ type:String, required:false},
    departureTime:{ type:String, required:true},
    originIcao:{ type:String, required:true},
    date:{ type:String, required:true},
    registration:{ type:String, required:true},
    fullname1:{ type:String, required:false},
    fullname2:{ type:String, required:false},
    fullname3:{ type:String, required:false},
    /* creator: { type:mongoose.Types.ObjectId, required: true , ref : 'User'} */
    
});

module.exports= mongoose.model('Handling', handlingShema);

