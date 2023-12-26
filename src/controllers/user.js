const User = require("../models/User");

const userController = async (req, res) => {
  const userID = req.user._id;
  const user = await User.findOne({ _id: userID });
  if (!user) return res.status(401).send({ message: "Unauthorized" });
  return res.status(200).send(user);
};

module.exports = {
  userController,
};
