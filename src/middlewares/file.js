const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const getDefaultFolder = () => {
  return process.env.CLOUDINARY_FOLDER || "productos";
};

const createStorage = (folderName) => {
  const folder = folderName || getDefaultFolder();

  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => ({
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
    }),
  });
}
const upload = multer({ storage: createStorage() });
module.exports = upload