const mongoose = require('mongoose');

const reservationschema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    passager: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    trajet: { type: mongoose.Schema.Types.String, ref: 'trajet' },
    covoitureur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    confirmed: { type: Boolean, default: false }, // Champ pour indiquer si la réservation est confirmée
    cancelled: { type: Boolean, default: false }, // Champ pour indiquer si la réservation est annulée par le covoitureur
    annulee: { type: Boolean, default: false }, // Champ pour indiquer que la reservation est annulée par le passager
    annuleePar: { 
        type: String, 
        enum: ['passager', 'covoitureur', null], // Indiquer qui a annulé
        default: null 
    }

});

module.exports = mongoose.model('reservation', reservationschema);
