const mongoose=require('mongoose');
const contact=new mongoose.Schema({
    name:String,
    lastname:String,
    numtelephone:Number,
    email:String,
    contac:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
});
module.exports=mongoose.model('contact',contact);