const router = require("express").Router();
const {
  userController
} = require("../controllers/user");
const verifyToken = require("../middlewares/verify_token");

router.get("/", verifyToken, userController);

module.exports = router;
