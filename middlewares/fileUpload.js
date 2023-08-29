/**
 * you can use whatever service you want to handle images,
 * I use multer just for simple testing
 */
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(error, __dirname + "/../uploads"); // you can customize tmp file here
    },
    filename: (req, file, cb) => {
        // here you can modify on the name of the uploaded image
        const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
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