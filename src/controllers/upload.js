const { upload } = require("../middlewares/uploadFile");

const uploadController = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = req.file.path;
    const originalFileName = req.file.originalname;
    const uploadedFileUrl = `http://localhost:3000/uploads/${req.file.filename}`;

    res.json({
      message: "File uploaded successfully",
      filePath: filePath,
      originalFileName: originalFileName,
      uploadedFileUrl: uploadedFileUrl,
    });
  });
};

module.exports = {
    uploadController
}
