/**
 * you can use whatever service you want to handle images,
 * I use multer just for simple testing
 */
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads"); // you can customize tmp file here
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileUpload = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 10, // 10MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) { // you can always change supported types
        return cb(new Error("Please upload an image"));
      }
  
      cb(undefined, true);
    },
  });

module.exports = fileUpload;