// const router = require('express').Router();
// const User = require('../models/Users');
// const Post = require('../models/Post');


// // create Task
// // router.post('/addTask', async(req,res)=>{
// //     try {
// //        const {title, content, email} = req.body;
// //        const existingUser = await User.findOne({email});
// //        if(existingUser){
// //         const post = new Post({title, content, user:existingUser});
// //         await post.save().then(() => res.status(200).json({post}));
// //         existingUser.post.push(post);
// //         existingUser.save();
// //        } 
// //     } catch (error) {
// //         console.log(error);
// //     }
// // });

// router.post('/addTask', async (req, res) => {
//   try {
//     const { title, content, id } = req.body;
//     const existingUser = await User.findById(id); // Use id instead of email
//     if (existingUser) {
//       const post = new Post({ title, content, user: existingUser });
//       await post.save().then(() => res.status(200).json({ post }));
//       existingUser.post.push(post);
//       existingUser.save();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });


// // edit task
// router.put('/updateTask/:id', async(req,res)=>{
//     try {
//        const {title, content, email} = req.body;
//        const existingUser = await User.findOne({email});
//        if(existingUser){
//         const post = await Post.findByIdAndUpdate(req.params.id, {title, content});
//         post.save().then(() => res.status(200).json({message: "Post updated" }));
//        } 
//     } catch (error) {
//         console.log(error);
//     }
// });

// // delete task
// router.delete('/deleteTask/:id', async(req,res)=> {
//     try {
//        const { email} = req.body;
//        const existingUser = await User.findOneAndUpdate({email}, {$pull:{list: req.params.id}});
//        if(existingUser){
//         await Post.findByIdAndDelete(req.params.id).then(() => 
//         res.status(200).json({message: "Post deleted" })
//         );
//        } else{
//         console.log("error on deleting");
//        }
//     } catch (error) {
//         console.log(error);
//     }
// });

// //get All task
// router.get('/getTasks/:id', async (req, res) => {
//     try {
//       const post = await Post.find({ user: req.params.id }).sort({ createdAt: -1 });
//       if (post.length !== 0) {
//         res.status(200).json({ post: post });
//       } else {
//         res.status(200).json({ message: "Posts are not available" });
//       }
//     } catch (error) {
//       // Log the error for debugging purposes
//       console.error("Error occurred while fetching tasks:", error);
//       // Handle the error and send an appropriate response
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });

//   router.get('/AllPosts', async (req, res)=>{
//     try {
//       const post = await Post.find({ }).sort({createdAt: -1});
//       if(post.length !== 0){
//         res.status(200).json({post: post});
//       }else{
//         res.status(200).json({message: "Posts are not available"});
//       }
//     } catch (error) {
//       console.error("Error occurred while fetching tasks:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   })
  

// module.exports = router;




const router = require('express').Router();
const User = require('../models/Users');
const Post = require('../models/Post');

// Create Post
router.post('/addTask', async (req, res) => {
  try {
    const { title, content, id } = req.body;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const post = new Post({ title, content, user: existingUser });
      await post.save();
      console.log('post is creating', post);
      
      // existingUser.post.push(post);
      existingUser.save();
      return res.status(200).json({ post });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error creating post' });
  }
});

// Update Post
router.put('/updateTask/:id', async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (post.user.toString() === userId) {
      await Post.findByIdAndUpdate(req.params.id, { title, content });
      return res.status(200).json({ message: 'Post updated' });
    }
    return res.status(403).json({ message: 'Not authorized to update this post' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error updating post' });
  }
});

// Delete Post
// router.delete('/deleteTask/:id', async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const post = await Post.findById(req.params.id);
//     if (post.user.toString() === userId) {
//       await Post.findByIdAndDelete(req.params.id);
//       return res.status(200).json({ message: 'Post deleted' });
//     }
//     return res.status(403).json({ message: 'Not authorized to delete this post' });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Error deleting post' });
//   }
// });


// delete task
router.delete('/deleteTask/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const deletePstsById = await Post.findByIdAndDelete(id);
      if (!deletePstsById) {
          return res.status(404).json({ message: "Post not found" });
      }
      return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
      return res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
});

      

// router.delete('/deleteTask/:id', async (req, res) => {
//   try {
//     const { userId } = req.body;
//     console.log("UserId from request body:", userId);
//     const post = await Post.findById(req.params.id);
//     console.log("Post found:", post);
//     if (post.user.toString() === userId) {
//       await Post.findByIdAndDelete(req.params.id);
//       return res.status(200).json({ message: 'Post deleted' });
//     }
//     return res.status(403).json({ message: 'Not authorized to delete this post' });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Error deleting post' });
//   }
// });


// Get All Posts
router.get('/AllPosts', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Get Posts by User ID
router.get('/getTasks/:id', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({ createdAt: -1 });
    // console.log("hello", posts);

    if (posts.length !== 0) {
     return res.status(200).json({ post: posts });  
    } else {
     return res.status(200).json({ message: "Posts are not available" });
    }

  } catch (error) {
    console.error("Error occurred while fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.get('/getTasks/:id', async (req, res) => {
//   try {
//     const posts = await Post.find({ user: req.params.id }).sort({ createdAt: -1 });
//     return posts.length
//       ? res.status(200).json({ posts })
//       : res.status(200).json({ message: 'No posts found' });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Error fetching posts' });
//   }
// });

module.exports = router;
