const Multer = require('multer')

const dotenv = require('dotenv')

const cloudinary = require('cloudinary').v2

const { CloudinaryStorage } = require('multer-storage-cloudinary')

dotenv.config({ path: './config/config.env' })

//destructure cloudinary env details

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env


//cloudinary config

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})


//multer config and storage


const storage = new CloudinaryStorage({

    cloudinary: cloudinary,
    params: {
        folder: 'starmatched',
        allowedFormats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => file.filename

    }
})

//parser

const parser = Multer({ storage: storage })
module.exports = parser