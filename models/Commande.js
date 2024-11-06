const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commandeModel = Schema({
    nameProduct: String,
    numCommande: Number,
    dateCommande: Date,
    price: Number,
    nombreArticle: Number,
    choix: String,
    message: String,
    produit: [{
        type: Schema.Types.ObjectId,
        ref: "produit"
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    fournisseur: {
        type: Schema.Types.ObjectId,
        ref: 'fournisseur'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'refused'],
        default: 'pending'
    }

})

module.exports = mongoose.model('commande', commandeModel)