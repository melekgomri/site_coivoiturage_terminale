const mongoose = require('mongoose');

const reservationschema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    passager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trajet: { type: mongoose.Schema.Types.String, ref: 'trajet' },
    confirmed: { type: Boolean, default: false }, // Champ pour indiquer si la réservation est confirmée
    cancelled: { type: Boolean, default: false } // Champ pour indiquer si la réservation est annulée
});

module.exports = mongoose.model('reservation', reservationschema);
