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
      allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"],
    }),
  });
}
const differentUpload = multer({ storage: createStorage("differentFolder") });
module.exports = differentUpload