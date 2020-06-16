const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/betty-API', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
})

mongoose.connection.on('open', ()=> {
   return console.log('Datbase Connected')
})

mongoose.connection.on('error', ()=> {
    return console.log('Unable to connect to database')
})