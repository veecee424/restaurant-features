const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const upload = async (file) => {
    
    try {
       const image = await cloudinary.uploader.upload(file, {"width": 300, "height": 300})
       if (image) {
           return image
       }
       throw new Error('Unable to upload image')
    } catch (error) {
        return error
    }
        
}

module.exports = upload;