const mongoose=require('mongoose');
const avisschema=new mongoose.Schema({
    contenue:String,
    note:Number,
    datePublication: { type: Date, default: Date.now },
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' }, // Passager
    covoitureur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
});
module.exports=mongoose.model('avis',avisschema);