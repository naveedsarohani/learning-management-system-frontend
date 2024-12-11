import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import { Link } from "react-router-dom"
import auth from "../../uitils/api/auth"
import { BsPersonCircle } from "react-icons/bs"
import { useState } from "react"

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

      <nav className="flex flex-wrap justify-between items-center px-2 sm:px-6 py-4 bg-white shadow-sm rounded-lg">
        {/* Navbar Left */}
        <div className="flex items-center space-x-2 text-gray-500">
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
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={handleDropdownToggle}
          >
            <BsPersonCircle size={24} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 mt-2 w-56 sm:w-48 bg-white border rounded-lg shadow-lg z-10">
              <div className="p-4 border-b text-gray-700 font-medium">
                <p>John Doe</p>
              </div>
              <ul className="py-2">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    onClick={() => alert("Go to Profile")}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    onClick={() => alert("Logging out...")}
                  >
                    {user ? (
                      <li onClick={handleLogout}>Logout</li>
                    ) : (
                      <li>
                        <Link to={"/auth/login"}>Login</Link>
                      </li>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Notification Icon */}
          <span className="text-gray-500 hover:text-gray-800">🔔</span>
        </div>
      </nav>
    </header>
  )
}
