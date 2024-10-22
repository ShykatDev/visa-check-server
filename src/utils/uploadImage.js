const path = require("path");
const cloudinary = require("../config/cloudinary.js");

const uploadedImage = async (file, folder) => {
  const mimeType = file.mimetype.split("/")[1];
  const filename = file.filename;
  const filePath = path.resolve(__dirname, "../uploads", filename);

  const uploadResult = await cloudinary.uploader
    .upload(filePath, {
      filename_override: filename,
      folder: `${folder}`,
      format: mimeType,
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = uploadedImage;
