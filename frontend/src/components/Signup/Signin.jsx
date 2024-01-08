import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
export default function Signin() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);
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
  const submit =async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:1000/api/v1/login",Inputs).then((respose)=>{
        
        if(respose.data.message==="Please Login First"){
          alert("You Have not Registered, Please Registered First");
          history("/signup")
        }
        else if(respose.data.message==="Password is Not Correct"){
          alert("Password is not Correct");
          setInputs({email:e.target.value,
          password:""});
        }
        else{
           
          sessionStorage.setItem("id",respose.data.others._id);
          dispatch(authActions.login());      
          setInputs({
            email:"",
            password:""
          })
          history("/todo")
        }
        
    })

  }
  return (
    <div className="h-[70vh] flex flex-col  items-center justify-center w-full bg-red-500 mt-5 rounded-2xl md:rounded-full pr-7">
      <div className="p-10 w-3/4 md:w-1/3  bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded drop-shadow-2xl ">
        <h1 className="mb-8 font-extrabold text-4xl">Sign In</h1>
        <form className="">
          <div className="mt-4">
            <label className="block font-semibold" name="email">
              Email
            </label>
            <input
              className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 "
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
                className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 "
                id="password"
                onChange={change}
                value={Inputs.password}

                type={type}
                name="password"
                required
              />
              <span
                className="flex justify-around items-center cursor-pointer"
                onClick={handleToggle}
              >
                <Icon className="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between mt-8">
            <button
              type="submit"
              onClick={submit}
              className="hover:bg-red-400 bg-opacity-40 backdrop-blur-xl font-semibold drop-shadow-lg flex items-center justify-center px-8 py-3 border border-transparent text-base rounded-md text-white bg   md:py-4 md:text-lg md:px-10"
            >
              Log In
            </button>
            <Link
              className="font-semibold text-white hover:text-gray-500"
              to="/signup"
            >
              Don't have a account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
