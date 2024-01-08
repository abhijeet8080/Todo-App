import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

export default function Signup() {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);
  // const navigate = useNavigate()
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eyeOff);
      setType("text");
    } else {
      setIcon(eye);
      setType("password");
    }
  };
  const change=(e)=>{
    const {name, value} = e.target;
    setInputs({...Inputs,[name]:value})
  }
  const submit=async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:1000/api/v1/register",Inputs).then((respose)=>{
        
        if(respose.data.message==="User already Exists"){
          alert("You Have Already Registered, Please Sign In");
          history("/signin")
        }
        else{
          alert(respose.data.message);
          
          setInputs({
            userName:"",
            email:"",
            password:""
          })
          history("/signin")
        }
        
    })
    
  }
  return (
    <div className="h-[80vh] flex flex-col  items-center justify-center w-full bg-red-500 mt-5 rounded-2xl md:rounded-full ">
      <div className="h-full p-10 mt-7 mb-7 w-3/4 md:w-1/3  bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg drop-shadow-2xl ">
        <h1 className="mb-8 font-extrabold text-4xl">Sign Up</h1>
        <form className='w-90%' action="POST">
          <div>
            <label className="block font-semibold" name="name">
              Username
            </label>
            <input
              className=" bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
              id="name"
              onChange={change}
              value={Inputs.userName}
              type="text"
              name="userName"
              required="required"
              autoFocus
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold" name="email">
              Email
            </label>
            <input
              className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
              id="email"
              onChange={change}
              value={Inputs.email}
              type="email"
              name="email"
              required="required"
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold" name="password">
              Password
            </label>
            <div className="mb-4 flex">
              <input
                className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="password"
                onChange={change}
                value={Inputs.password}
                type={type}
                name="password"
                required="required"
              />
              <span
                className="flex justify-around items-center cursor-pointer"
                onClick={handleToggle}
              >
                <Icon className="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              type="submit"
              onClick={submit}
              className="hover:bg-red-400 bg-opacity-40 backdrop-blur-xl font-semibold drop-shadow-lg flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-white bg   md:py-4 md:text-lg md:px-10"
            >
              Register
            </button>
            <Link
              className="font-semibold text-white hover:text-gray-500"
              to="/signin"
            >
              Already registered?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
