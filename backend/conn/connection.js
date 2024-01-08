const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/todolistDb");

connect.then(()=>{
    console.log("Database is connected successfully");
})
.catch(()=>{
    console.log("Database cannot be connected");

})
