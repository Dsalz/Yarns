const cloudinary = require('cloudinary');

exports.storeImage = (req, res) => {
    console.log('sending to cloudinary'); 
    cloudinary.uploader.upload_stream(result => console.log(result));
}