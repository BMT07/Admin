const express = require("express")
const connect = require('./db')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')


app.use(cors())


connect()

app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 5000

app.use('/user', require('./controllers/userController'))
app.use('/supplier', require('./controllers/fournisseurController'))
app.use('/produit', require('./controllers/produitController'))
app.use('/commande', require('./controllers/commandeController'))

app.listen(port, () => console.log(`app running on port:${port}`))