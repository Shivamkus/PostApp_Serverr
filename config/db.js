// require monggose
const mongoose = require("mongoose");

//  db connect 
mongoose.connect('mongodb://localhost:27017/Post_ManageMent_App');



// create connection
const db = mongoose.connection;

// check error
db.on('error', console.error.bind(console,'error on connecting database ❌'));
db.once('open', function(){
    console.log('database connected successfully : ✅');
});

module.exports = db;