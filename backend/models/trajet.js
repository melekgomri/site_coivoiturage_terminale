const mongoose=require('mongoose');
const trajetschema=new mongoose.Schema({
    place:String,
    depart:Number,
    arrive:Number,
    datedapart:Date,
    placedisponible:Number,
    cout:Number,
    conducteur:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});
module.exports=mongoose.model('trajet',trajetschema);