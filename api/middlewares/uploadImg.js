const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const dedicatedImg = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chonijaDJ",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"],
    transformation: [{ width: 1920, height: 1080, crop: 'fill' }],
    quality: "auto"
  }
});
const upDedicatedImg = multer({ storage: dedicatedImg });

module.exports = { upDedicatedImg }