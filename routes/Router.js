const express = require('express');
const { createPost } = require('../controllers/PostController');
const PostRouter = express.Router();

// Routers for Posts
PostRouter.post('/AddPost', createPost)




module.exports = PostRouter;