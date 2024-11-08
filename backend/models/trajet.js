const mongoose=require('mongoose');

const trajetschema=new mongoose.Schema({
    from:String,
    to:String,
    depart:String,
    datedapart:Date,
    placedisponible:Number,
    cout:Number,
    conducteur:{type:mongoose.Schema.Types.ObjectId,ref:'Utilisateur'},
});
module.exports=mongoose.model('trajet',trajetschema);