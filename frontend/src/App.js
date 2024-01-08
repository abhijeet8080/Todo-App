import './App.css';
import { useEffect } from 'react';
import About from './components/Aboutus/About';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './components/Signup/Signup';
import Signin from './components/Signup/Signin';
import Todo from './components/Todo/Todo';
import { useDispatch } from "react-redux";
import { authActions } from "../src/store";
import Navbar2 from './components/Navbar/Navbar2';
import Home2 from './components/Home/Home2';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());      
      
    }
    

  
   
  }, [])
  
  return (
    <><BrowserRouter >
    {/* <Navbar /> */}
    <Navbar2 />
      <Routes>
        <Route index element={<Home2 />}></Route>
        <Route path="/home" element={<Home2 />}></Route>
        <Route path="/aboutus" element={<About />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
      
      
    </>
  );
}

export default App;
