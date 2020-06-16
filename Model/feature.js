const mongoose = require('mongoose')

const featureSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Feature'
    },
    properties: {
        key: {
            type: Number,
            trim: true
        },
        name: {
            type: String,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        picture: {
            type: String,
            trim: true
        } 
    },
    geometry: {
        type: {
            type: String,
            default: 'point'
        },
        coordinates: []
    }
}, {
    timestamps: true
})

const Feature = mongoose.model('feature', featureSchema);
module.exports = Feature;