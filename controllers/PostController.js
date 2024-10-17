const Post = require('../models/Post.js');

// create posts
module.exports = {
    createPost:async(req, res)=>{
        try {
            const {title, content, } = req.body;
            const newPost = new Post({title, content});
            await newPost.save();
            return res.status(200).json({msg:"New Post added ", Post})
            
        } catch (error) {
            return res.status(500).json({msg:"Internal Server Error"})
        }
    }
}