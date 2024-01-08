import todoLogo from "D:/Full Stack Web Development/ToDO APP/frontend/src/images/todo logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
export default function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  const logOut =()=>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());      

  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 text-2xl">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center">
          <img src={todoLogo} className="h-12 mr-3" alt="" />
          <span className="self-center text-4xl font-bold  whitespace-nowrap text-orange-600">
            ToDo
          </span>
        </Link>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
        
          <div className="relative visible mt-3 md:hidden">
          
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>
          </div>
          <ul className="flex  flex-col items-center   p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/home"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-black md:hover:text-orange-600 md:p-0 md:dark:text-orange-600 bg"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/todo"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                ToDo
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <>
                  <li onClick={logOut}>
                    <Link
                      to=""
                      className="block py-2 pl-3 pr-4 text-white rounded-lg hover:bg-gray-100 md:hover:bg-amber-400 md:hover: md:p-2 dark:tet-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 bg-orange-400 "
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="block py-2 pl-3 pr-4 text-white rounded-lg hover:bg-gray-100 md:hover:bg-amber-400 md:hover: md:p-2 dark:tet-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 bg-orange-400 "
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signin"
                    className="block py-2 pl-3 pr-4 text-white rounded-lg hover:bg-gray-100 md:hover:bg-amber-400 md:hover: md:p-2 dark:tet-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 bg-orange-400 "
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}

            {/* <li>
              <Link>
                <RiAccountCircleFill className="block  cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-4xl" />
              </Link>
            </li> */}
          </ul>
        </div>
    
    </nav>
  );
}
