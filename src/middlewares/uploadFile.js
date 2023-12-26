const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name
    console.log(file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// const maxSize = 8 * 1000 * 1000; 
var upload = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|m4a|mp3|mp4|octet-stream/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },

  // mypic is the name of file attribute
}).single("file");

module.exports = { upload };
