import { NavLink } from "react-router-dom"

const Menu = () => {
  return (
    <ul className="flex mt-2 md:px-60 justify-around bg-gray-50 border-b border-gray-200 p-4 text-sm font-medium">
      <li className="relative group">
        <NavLink
          to="/me"
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent transition-colors"
              : "text-gray-700 hover:text-black transition-colors"
          }
        >
          All Courses
        </NavLink>
        <div
          className={`absolute left-0 bottom-0 h-[2px] ${
            window.location.pathname === "/me" ? "w-full" : "w-0"
          } bg-gradient-to-r from-[#21bffd] to-[#217bfe] group-hover:w-full transition-all`}
        ></div>
      </li>
      <li className="relative group">
        <NavLink
          to="/me/courses"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent transition-colors"
              : "text-gray-700 hover:text-black transition-colors"
          }
        >
          My Course
        </NavLink>
        <div
          className={`absolute left-0 bottom-0 h-[2px] ${
            window.location.pathname === "/me/courses" ? "w-full" : "w-0"
          } bg-gradient-to-r from-[#21bffd] to-[#217bfe] group-hover:w-full transition-all`}
        ></div>
      </li>
      <li className="relative group">
        <NavLink
          to="/me/exams"
          className={({ isActive }) =>
            isActive
              ? "bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent transition-colors"
              : "text-gray-700 hover:text-black transition-colors"
          }
        >
          Exams/Tests
        </NavLink>
        <div
          className={`absolute left-0 bottom-0 h-[2px] ${
            window.location.pathname === "/me/exams" ? "w-full" : "w-0"
          } bg-gradient-to-r from-[#21bffd] to-[#217bfe] group-hover:w-full transition-all`}
        ></div>
      </li>
    </ul>
  )
}

export default Menu
