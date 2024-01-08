import React, { useState } from 'react'
import { Link } from "react-router-dom";
import todoLogo from "D:/Full Stack Web Development/ToDO APP/frontend/src/images/todo logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
export default function Navbar2() {
    const [isNavOpen,setIsNavOpen] = useState(true)
    const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  const logOut =()=>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());      

  }
  return (
    <nav className=''>
        <div className='flex md:justify-center  mt-10 ml-7 mr-7 justify-between items-center '>
            {isNavOpen?<><Link to="/home" className='flex mr-3   space-x-1'>
                <img src={todoLogo} className="h-12 " alt="" />
                <span className="self-center text-4xl font-bold  whitespace-nowrap text-red-600">ToDo</span>

            </Link>
            <div className= ' cursor-pointer space-y-2 md:hidden lg:hidden animate-pulse' onClick={()=>{setIsNavOpen(!isNavOpen)}}>
                <span className="hover:bg-slate-400 block h-0.5 w-8  bg-gray-600"></span>
                <span className="hover:bg-slate-400 block h-0.5 w-8  bg-gray-600"></span>
                <span className="hover:bg-slate-400 block h-0.5 w-8  bg-gray-600"></span>
            </div></>:
            <div className='bg-red-500 h-[100vh] w-full text-white absolute top-0 right-0 transition-transform ease-linear delay-1000 duration-1000 z-10'>
                <div onClick={()=>{setIsNavOpen(!isNavOpen)}} className=' hover:text-gray-500 cursor-pointer absolute right-10 text-5xl  mr-4 mt-10'>X</div>
                <ul className=' text-white flex flex-col justify-center items-center h-full space-y-10 text-2xl'>
                    <Link to="/home" className='hover:text-gray-500' onClick={()=>{setIsNavOpen(!isNavOpen)}}>Home</Link>
                    <Link to="/aboutus" className='hover:text-gray-500' onClick={()=>{setIsNavOpen(!isNavOpen)}}>About</Link>
                    <Link to="/todo" className='hover:text-gray-500' onClick={()=>{setIsNavOpen(!isNavOpen)}}>ToDo</Link>
                    {isLoggedIn?<Link to="/" className='hover:text-gray-500' onClick={logOut}>Log Out</Link>:<><Link to="/signin" onClick={()=>{setIsNavOpen(!isNavOpen)}} className='hover:text-gray-500'>Sign in</Link>
                    <Link to="/signup" className='hover:text-gray-500' onClick={()=>{setIsNavOpen(!isNavOpen)}}>Sign Up</Link></>}
                    
                </ul>
            </div>}
            
            
        </div>
        <div className=' w-full hidden md:block lg:block  mt-5    font-semibold'>
            <div className='flex justify-center items-center'>
            <ul className='w-[50%] justify-evenly py-2 rounded-3xl bg-red-500 space-x-10 text-2xl flex items-center text-white'>
                <Link className="hover:animate-pulse" to="/home">Home</Link>
                <Link className="hover:animate-pulse" to="/aboutus">About</Link>
                <Link className="hover:animate-pulse" to="/todo">ToDo</Link>
                {isLoggedIn ?
                <Link className="hover:animate-pulse" onClick={logOut} to="/" >Log Out</Link> :
                    <>
                <Link className="hover:animate-pulse" to="/signin" >Sign in</Link>
                <Link className="hover:animate-pulse" to="/signup" >Sign Up</Link>
                 </>
                }
            </ul>
            </div>
</div>


    </nav>
    
  )
}
