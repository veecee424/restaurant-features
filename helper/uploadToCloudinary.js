const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const upload = async (file) => {
    
    try {
       const image = await cloudinary.uploader.upload(file)
       if (image) {
           return image
       }
       throw new Error('Unable to upload image')
    } catch (error) {
        console.log(e)
    }
        
}

module.exports = upload;