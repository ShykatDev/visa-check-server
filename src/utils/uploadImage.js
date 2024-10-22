const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const uploadImage = (file, folder) => {
  return new Promise((resolve, reject) => {
    const timestamp = Math.round((new Date).getTime()/1000);

    const uploadParams = {
      folder: folder,
      timestamp: timestamp,
    };

    console.log('Upload Params:', uploadParams);
    console.log('API Key:', cloudinary.config().api_key);
    console.log('API Secret:', cloudinary.config().api_secret ? 'Set' : 'Not Set');

    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      cloudinary.config().api_secret
    );

    console.log('Generated Signature:', signature);

    const finalParams = {
      ...uploadParams,
      signature: signature,
      api_key: cloudinary.config().api_key,
    };

    let stream = cloudinary.uploader.upload_stream(
      finalParams,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    if (file.buffer) {
      streamifier.createReadStream(file.buffer).pipe(stream);
    } else {
      reject(new Error('Invalid file format'));
    }
  });
};

module.exports = uploadImage;
