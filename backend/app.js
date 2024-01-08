const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/user"); // Import the User model
const List = require("./models/list"); // Import the User model
const cors = require("cors");
require("./conn/connection");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.post("/register", async (req, res) => {
//     try {
//         const data = {
//             email: req.body.email,
//             userName: req.body.userName,
//             password: req.body.password
//         };
//         const existingUser = await User.findOne({email:data.email});
//         if(existingUser){
//             console.log("User already Exists");
//             res.json({message:"User already Exists"});
//         }
//         else{
//             const saltRounds = 10;
//             const hashedPassword = await bcrypt.hash(data.password,saltRounds);
//             data.password = hashedPassword;
//             const userData = await User.insertMany(data);
//             console.log(userData);
//             res.status(200).json({ userData: userData });
//         }
//         // const {email, userName, password}= req.body;
//         // const user = new User({email, userName, password});
//         // await user.save().then(()=>res.status(200).json({user:user}))
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: "User registration failed" });
//     }
// });
// app.post("/login", async(req,res)=>{
//     try {
//         const user = await User.findOne({email:req.body.email});
//         if(!user){
//             res.status(400).json({message:"Please Login First"});
//         }
//         const isPasswordMatch = bcrypt.compareSync(req.body.password,user.password);
//         if(!isPasswordMatch){
//             res.status(400).json({message:"Password is Not Correct"});
//         }
//         const {password, ...others} = user._doc;
//         res.status(200).json({others});
//     } catch (error) {
//         res.status(400).json({message:"User Alredy Exists"});
//     }
// })
app.use("/api/v1",auth)
app.use("/api/v2",list)
// app.post("/addTask",async(req,res)=>{
    
//     try {
//         const {title, body, email} = req.body;
//         const existingUser = await User.findOne({email:email});
//         if(existingUser){
//             const list = new List({title, body, user:existingUser});
//             await list.save().then(()=>{res.status(200).json({list})});
//             existingUser.list.push(list);
//             existingUser.save();
//         }
//         else{
//             res.json("User does not exist");

//         }
//     } catch (error) {
        
//         console.log(error)
//     }
// })
// connection/connection.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
try {
    app.listen(1000, () => {
        console.log("Server is running on port 1000");
    });
} catch (error) {
    console.error("Error starting the server:", error);
}
