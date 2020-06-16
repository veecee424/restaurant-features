const app = require('./app')

const port = process.env.PORT || 8008;

//Hear please!
app.listen(port, () => {
    console.log(`Kini is listening on ${port}`)
})