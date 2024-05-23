import asyncHandler from "express-async-handler";
import Post from "../models/posts.js"


// @desc    POST a Post
// @route   POST /api/post
const post = asyncHandler(async (req, res) => {
  const {user_id , name, user_name, user_photo_url , description, likes} = req.body;
  if (!user_id || !name || !user_name || !user_photo_url || !description) {
    throw new Error("provide all details during registeration ...");
  }

  const newPost = new Post({
    user_id , name, user_name, user_photo_url , description, likes
  });
  const post = await newPost.save();
  res.status(200).json({ success: true, message: post });
});

// @desc    GET all Posts
// @route   GET /api/posts
const getPosts = asyncHandler(async (req, res) => {
  const post = await Post.find({}).sort({ createdAt: -1 });
  res.json({ success: true, message: [post] });
});


// @desc    GET post by user_id
// @route   GET /api/post/:id

const getPostByUserId = asyncHandler(async (req, res) => {
  const { user_id} = req.query;
  try {
    const post = await Post.findById(
      user_id
    );
    res.json([post]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
});
 




export { getPostByUserId , getPosts , post};