const express = require('express')
const app = express()
//require database connecttion setup
require('./db/config')
const Feature = require('./Model/feature')
const key = require('./helper/incrementKey')
const bodyParser = require('body-parser')
const multer = require('multer')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

// Upload a feature
app.post('/upload', async (req, res) => {

    const newFeature = {
        properties: {
            ...req.body,
            key: await key()
        },
        geometry: (req.body)
    }
    try {
        const feature = await new Feature(newFeature)
        feature.geometry.coordinates.push(req.body.longitude)
        feature.geometry.coordinates.push(req.body.latitude)
        await feature.save()
        if(feature) {
            return res.status(201).send({"Success": feature})
        } 
            return res.status(204).send({"error": 'Unable to create feature'})
    } catch (error) {
        return res.status(500).send('Something went wrong')
    }
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