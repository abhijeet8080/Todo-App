const router = require("express").Router();
const User= require("../models/user");
const List= require("../models/list");

//Create
router.post("/addTask",async(req,res)=>{
    try {
        console.log("Add Task is called");
        const {title, body, _id} = req.body;
        const existingUser = await User.findById({_id:_id});
        if(existingUser){
            console.log("User Exists")
            const list = new List({title, body, user:existingUser});
            await list.save().then(()=>{res.status(200).json({list})});
            existingUser.list.push(list);
            existingUser.save();
            console.log("Task is added")
        }
        else{
            res.json("User does not exist");
            
        }
    } catch (error) {
        
        console.log(error)
    }
})
//Update
router.put("/updateTask/:id", async (req, res) => {
    try {
      const { title, body } = req.body;
      const list = await List.findByIdAndUpdate(req.params.id, { title, body });
  
      if (!list) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task Update Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
//Delete
router.delete("/deleteTask/:id",async(req,res)=>{
    try {
        console.log("Delete Task is called");
        const {id} = req.body;
        console.log(id)
        const existingUser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}});
        if(existingUser){
            const list = await List.findByIdAndDelete(req.params.id).then(()=>{res.status(200).json({message:"Task Deleted Successfully"})});

        }
        else{
            res.json("User does not exist");
            
        }
    } catch (error) {
        
        console.log(error)
    }
})
//GetTasks
router.get("/getTasks/:id",async(req,res)=>{
    const list = await List.find({user:req.params.id}).sort({createdAt:-1});
    if(list.length!==0){
        res.status(200).json({list});

    }
    else{
        res.status(200).json({message:"no tasks"});

    }

})
module.exports = router;
