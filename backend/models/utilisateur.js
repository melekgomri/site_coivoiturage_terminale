const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    age: Number,
    email: String,
    password: String,
    phone: String,
    isAdmin: { type: Boolean, default: false }, // Champ pour le rôle admin
    isCovoitureur: { type: Boolean, default: false } // Champ pour le rôle covoitureur
});

const Utilisateur = mongoose.model('Utilisateur', UtilisateurSchema);
module.exports = Utilisateur;
