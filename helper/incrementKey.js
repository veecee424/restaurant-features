const Feature = require('../Model/feature')

const key = async () => {
    try {
        const num = await Feature.find().countDocuments();
        console.log(num)
        return num+1;
    } catch (error) {
        return res.status(500).send('Something went wrong')
    }
}

module.exports = key;