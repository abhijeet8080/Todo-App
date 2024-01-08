import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='home ml-5 mr-5 flex justify-center items-center'>
      <div className="container flex flex-col space-y-10 items-center justify-center mx-auto  ">
        <h1 className='text-center text-5xl font-bold'>
          Organize your <br />work and life, finally. 
        </h1>
        <p className='text-xl'> 
          Become focused organized and calm with <br />ToDo App. The world's best Task Manager.
        </p>
        <Link to="/todo" className='p-5 text-white text-3xl font-semibold rounded-lg bg-orange-400 hover:bg-yellow-300'>
          Make ToDo List
        </Link>
      </div>
    </div>
  )
}
