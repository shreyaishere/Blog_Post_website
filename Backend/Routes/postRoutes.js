const express = require("express");
const Post = require("../models/post");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, async (req, res, next) => {
  const { title, content, image } = req.body;
  console.log(title);

  try {
    const post = new Post({
      title,
      image,
      content,
      author: req.userId,
    });
    await post.save();
    res.json({ message: "Post created successfully" });
  } catch (err) {
    next(err);
  }
});

//Get all posts
// router.get("/", async (req, res) => {
//   const posts = await Post.find().sort({ _id: -1 });
//   res.json(posts);
// });

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name") // only populate the name field
      .sort({ _id: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

//Get posts by login user
router.get("/myposts", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId })
      .populate("author",'name')
      .sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

//Get post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Post not found" });
  }
});

//Delete post
router.delete("/:id", verifyToken, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

//Edit post
router.put("/:id", verifyToken, async (req, res) => {
  const { title, content, image } = req.body;
  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, image },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;
