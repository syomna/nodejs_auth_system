
const postsController = async (req, res) => {
  console.log(req.user._id);
  res.json({
    posts: [{ title: "First title", description: "First description" }],
  });
};

module.exports.postsController = postsController;
