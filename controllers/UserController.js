const User = require('../models/Users');

module.exports = {
     Signup : async(req, res)=>{
        try {
            const {name, email, password} = req.body;
            const isUserExist = User.findOne({email});
            if(isUserExist){
                return res.json({msg:'User already exist'});
            }

            
        } catch (error) {
            
        }
    }
};