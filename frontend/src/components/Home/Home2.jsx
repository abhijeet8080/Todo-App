import React from 'react'
import { Link } from 'react-router-dom'

function Home2() {
  return (
    <div className='h-[85vh]  flex flex-col space-y-12 items-center justify-center px-6 '>
        <div className='flex flex-col space-y-6'>
            <h1 className='text-center text-5xl font-bold md:text-7xl lg:text-7xl'>Organize your <br />work and life, finally.</h1>
            <p className='text-center text-lg md:text-2xl '>Become focused organized and calm with <br />ToDo App. The world's best Task Manager.</p>
        </div>
        
            <Link to="/todo" className='bg-red-500 hover:bg-red-300 text-white font-semibold py-3 px-5 rounded-md md:py-5 md:px-10 md:text-xl' >Make ToDo List</Link>
        
    </div>
  )
}

export default Home2