const router = require("express").Router();
const verifyToken = require("../middlewares/verify_token");

const {
  postsController,
} = require("../controllers/posts");

router.get("/", verifyToken, postsController);
module.exports = router;
