const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = Schema({
    name: String,
    prenom: String,
    password:String,
    email: String,
    adresse: String,
    phone: String,
    naissance: Date

})

module.exports = mongoose.model('user', userModel)