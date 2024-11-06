const mongoose = require('mongoose')
const Schema = mongoose.Schema

const produitModel = Schema({
    productName: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'refused'],
        default: 'pending'
    },
    photo: {
        type: String
    },
    category: {
        type: String,
        enum: ['beauty', 'decor', 'accessory', 'games', 'autres'],
        required: true
    },
    material: {
        type: String,
        enum: ['wood', 'olive wood', 'glass', 'plastic', 'autres'],
        required: true
    },
    type: {
        type: String,
        enum: ['traditionnal', 'modern', 'mix'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dimension1: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    dimension2: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    dimension3: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    time1: {
        type: Number
    },
    time2: {
        type: Number
    },
    time3: {
        type: Number
    },

    personaliser: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    fournisseur: {
        type: Schema.Types.ObjectId,
        ref: 'fournisseur'
    },

    customizable: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
    ;


module.exports = mongoose.model('produit', produitModel)