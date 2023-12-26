const router = require("express").Router();
const { uploadController } = require("../controllers/upload");
const verifyToken = require("../middlewares/verify_token");

router.post("/", verifyToken, uploadController);

module.exports = router;

