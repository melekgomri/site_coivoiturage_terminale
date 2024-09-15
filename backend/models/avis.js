const mongoose=require('mongoose');
const avisschema=new mongoose.Schema({
    contenue:String,
    note:Number,
    datepublication:Date,
    auteur:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});
module.exports=mongoose.model('avis',avisschema);