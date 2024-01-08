const router = require("express").Router();
const User= require("../models/user");
const bcrypt = require("bcrypt");


//Sign In
router.post("/register", async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password
        };
        console.log(data)
        const existingUser = await User.findOne({email:data.email});
        if(existingUser){
            console.log("User already Exists");
            res.json({message:"User already Exists"});
        }
        else{
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password,saltRounds);
            data.password = hashedPassword;
            const userData = await User.insertMany(data);
            console.log(userData);
            res.status(200).json({
                //  userData: userData,
                 message:"Signed Up Successfully"
             });
        }
        // const {email, userName, password}= req.body;
        // const user = new User({email, userName, password});
        // await user.save().then(()=>res.status(200).json({user:user}))
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "User registration failed" });
    }
});
router.post("/login", async (req, res) => {
    try {
        console.log(req.body.email);
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            res.status(200).json({ message: "Please Login First" });
            return; // Add a return statement here to exit the function
        }

        const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordMatch) {
            res.status(200).json({ message: "Password is Not Correct" });
            return; // Add a return statement here to exit the function
        } else {
            const { password, ...others } = user._doc;
            res.status(200).json({ others });
        }
    } catch (error) {
        res.status(200).json({ message: "User Already Exists" });
    }
});

module.exports = router;

