const mongoose = require('mongoose')


const fournisseurModel = mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    adresse: String,
    phone: String,
    naissance: String,
    status: {
        type: String,
        enum: ['pending', 'accepted', 'refused'],
        default: 'pending'
    }

})

module.exports = mongoose.model('fournisseur', fournisseurModel)