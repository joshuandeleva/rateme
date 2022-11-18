const cloudinary = require('cloudinary').v2
cloudinary.comfig({
    cloud_name:process.env.CLOUD_NAME,
    cloud_api:process.env.CLOUD_API_KEY,
    clouud_api_secret:process.env.CLOUD_API_SECRET
})