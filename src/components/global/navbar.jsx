import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import { Link } from "react-router-dom"
import auth from "../../uitils/api/auth"
import { BsPersonCircle } from "react-icons/bs"
import { useState } from "react"
import { capEach, isNullOrEmpty, readFile } from "../../uitils/functions/global"
import ActionButton from "./ActionButton"

export default function Navbar() {
  const { handler } = useHandler()
  const {
    credentials: { user, token },
    user: { revoke },
  } = useAuth()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  function handleLogout() {
    auth.logout(token, { ...handler, revoke })
  }

  return (
    <header>
      {/* <nav>
            <ol>
                {user
                    ? <li onClick={handleLogout}><button>Logout</button></li>
                    : <li><Link to={'/auth/login'}>Login</Link></li>
                }
            </ol>
        </nav> */}

      <nav className="bg-gradient-to-r from-[#217bfe] to-[#21bffd] w-full  flex flex-wrap justify-between items-center px-2 sm:px-6 py-2 bg-white shadow-sm ">
        {/* Navbar Left */}
        <div className="flex items-center space-x-2 text-white">
          <span>🏠</span>
          <span className="text-sm font-medium">
            <Link to={"/"}>Learning Management System</Link>
          </span>
        </div>

        {/* Navbar Right */}
        <div className="flex  items-center space-x-4 relative mt-2 sm:mt-0 w-full sm:w-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 w-full sm:w-auto"
          />

          {/* Profile Icon */}
          {!isNullOrEmpty(user.id) ? (
            <button
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={handleDropdownToggle}
            >
              <img src={readFile(user.image)} className="w-10 rounded-full" />
            </button>
          ) : (
            <>
              <ActionButton name="login" route="/auth/login" />
              <ActionButton name="register" route="/auth/register" />
            </>
          )}

          {/* Dropdown Menu */}
          {!isNullOrEmpty(user) && isDropdownOpen && (
            <div className="absolute top-12 right-0 mt-2 w-56 sm:w-48 bg-white border rounded-lg shadow-lg z-10">
              <div className="p-4 border-b text-gray-700 font-medium">
                <p>{capEach(user.name)}</p>
              </div>
              <ul className="py-2">
                <li>
                  <Link to={"/profile"}>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                      Profile
                    </button>
                  </Link>
                </li>
                {user.role && user.role === "student" && (
                  <li>
                    <Link to={"/me"}>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                        My page
                      </button>
                    </Link>
                  </li>
                )}
                <li>
                  {user ? (
                    <li onClick={handleLogout}>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link to={"/auth/login"}>Login</Link>
                    </li>
                  )}
                </li>
              </ul>
            </div>
          )}

          {/* Notification Icon */}
          {/* <span className="text-gray-500 hover:text-gray-800">🔔</span> */}
        </div>
      </nav>
    </header>
  )
}
