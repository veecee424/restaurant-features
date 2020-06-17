const multer = require('multer')

/**
 * Multer setup
 */
let storage = multer.diskStorage({
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({
    limits: {
        fileSize: 1000000
    }, //Maximum file size in bytes
    fileFilter(req, file, cb) {
        const validTypes = ['JPEG', 'JPG', 'PNG'] //acceptable file types

        const valid = validTypes.filter((type) => {
            return file.originalname.endsWith(type);
        })
        valid[0] !== undefined ? cb(null, true) : cb(new Error('Upload a valid (png, jpeg, or jpg) image file'))
    },
    storage: storage
})

module.exports = upload;