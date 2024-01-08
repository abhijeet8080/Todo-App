import React, { useState, useEffect } from "react";
import "./Todo.css";
import Todocards from "./Todocards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useSelector } from "react-redux";
import axios from "axios";
let id = sessionStorage.getItem("id");
let toupdateArray = [];
export default function Todo() {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  
  
  
  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const update=(value)=>{
    
    toupdateArray = Array[value];
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submit = async () => {
    if (Inputs.title && Inputs.body == null) {
      toast.error("Title Or Body should not be empty");
    } else {
      if (id) {
        await axios
          .post("http://localhost:1000/api/v2/addTask", {
            title: Inputs.title,
            body: Inputs.body,
            _id: id,
          })
          .then((response) => {
            setInputs({ title: "", body: "" });
            toast.success("Your Task is Added");
           
          });
      }
      else{
        setArray([...Array, Inputs]);
      setInputs({ title: "", body: "" });
      toast.success("Your Task is Added");
      setTimeout(function () {
       
          toast.error("But Task is not Saved: Please Sign Up");
        
      }, 1000);
      }
    }
  };
  const del = async(Cardid) => {
    // Array.splice(id, "1");
    // setArray([...Array]);
    if(id){
      await axios.delete(`http://localhost:1000/api/v2/deleteTask/${Cardid}`,{data:{id:id},}).then((response)=>{
        
      toast.success("Your Task Deleted Successfully");
  
      })
    }else{
      toast.error("Please Sign in First");
    }
    
  };
  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };
  useEffect(() => {
    if(id){
      const fetchTasks = async () => {
        await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`).then((response) => {
          
          setArray(response.data.list);
        });
      };
      
      fetchTasks();
    }
  }, [submit]);
  return (
    <>
      <div className="todo pb-5 relative mt-10 w-full ">
        <ToastContainer />
        <div className="todo-main flex flex-col space-y-5  items-center  justify-center w-full border-black ">
          <div className="flex flex-col shadow-2xl space-y-1   items-center w-3/4 md:w-2/4 lg:w-2/4 bg-red-500 p-5 rounded-xl md:rounded-full">
            <input
              className="border-none w-full md:w-[80%]  my-2 z-0 p-2 border-red-700 rounded-xl "
              onClick={show}
              type="text"
              placeholder="TITLE"
              name="title"
              value={Inputs.title}
              onChange={change}
              
            />
            <textarea
              id="textarea"
              className="border-none w-full md:w-[80%] outline-none p-2 z-0 rounded-xl  "
              type="text"
              placeholder="BODY"
              name="body"
              value={Inputs.body}
              onChange={change}
            />
          </div>
          <button
            onClick={submit}
            className="py-2 px-5 text-white rounded-xl font-semibold bg-red-500 hover:bg-red-300 md:py-5 md:px-9 md:text-2xl"
          >
            ADD
          </button>
        </div>
        <div className="todo-body max-w-screen-2xl flex mt-3 mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full">
            {Array &&
              Array.map((item, index) => (
                <div key={index}>
                  <Todocards
                    id={item._id}
                    title={item.title}
                    body={item.body}
                    delid={del}
                    display={dis}
                    updateId={index}
                    tobeUpdate={update}                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div
        id="todo-update"
        className="todo-update h-[80vh] w-full  top-[100px] rounded-xl hidden bg-amber-500 fixed"
      >
        <div className="container max-w-screen-2xl flex mt-10 mx-auto p-4">
          <Update display={dis} update={toupdateArray}/>
        </div>
      </div>
    </>
  );
}
