const express = require('express')
const app = express()
//require database connection setup
require('./db/config')
const Feature = require('./Model/feature')
const key = require('./helper/incrementKey')
const bodyParser = require('body-parser')
const upload = require('./config/multer')
const uploadToCloudinary = require('./helper/uploadToCloudinary');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

// Upload a feature
app.post('/upload', upload.single('picture'), async (req, res) => {

    const image = await uploadToCloudinary(req.file.path)
    const newFeature = {
        properties: {
            ...req.body,
            key: await key(),
            picture: image.url
        },
        geometry: (req.body)
    }
    try {
        const feature = await new Feature(newFeature)
        feature.geometry.coordinates.push(req.body.longitude)
        feature.geometry.coordinates.push(req.body.latitude)
        await feature.save()
        if(feature) {
            return res.status(201).send(feature)
        } 
            return res.status(204).send({"error": 'Unable to create feature'})
    } catch (error) {
        return res.status(500).send('Something went wrong')
    }
}, (e, req, res, next)=> {
    return res.status(422).send(e.message)
})

//get all features
app.get('/features', async (req, res) => {
    try {
        const features = await Feature.find({})
        if(features) {
            return res.status(200).send({'features': features})
        }
        return res.status(400).send('Unable to find features')
    } catch (error) {
        return res.status(500).send('Something went wrong')
    }
})


module.exports = app;