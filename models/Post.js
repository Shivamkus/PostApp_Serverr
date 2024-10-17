// const mongoose = require('mongoose');
// const postSchema = new mongoose.Schema({
//     title:{
//         type : String,
//         required: true,
//     },
//     content:{
//         type:String,
//         required:true,
//     },
//     user: [
//         {
//           type: mongoose.Types.ObjectId,
//           ref: "User",
//         },
//       ],
// },{timestamps: true});

// module.exports = mongoose.model('Post', postSchema);


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
