const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://bmt:GMhCm6Kvyeoefafn@cluster0.pjosc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('database connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connect;


