import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { role } from "../../uitils/functions/constants"
import { useState } from "react"
import { RiMenuUnfoldFill } from "react-icons/ri"
import { RiMenuUnfold2Fill } from "react-icons/ri"

export default function SideBar({ toggleSidebar, isOpen, userRole }) {
  return (
    <aside>
      {/* <div>LMS</div>
        <ul>
            {userRole === role.ADMIN && <li><Link to={'/instructors'}>Instructor</Link></li>}
            <li><Link to={'/courses'}>Courses</Link></li>
        </ul> */}
      <div>
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-10 text-white bg-blue-500 p-2 rounded-md md:hidden"
        >
          {isOpen ? <RiMenuUnfold2Fill /> : <RiMenuUnfoldFill />}
        </button>

        {/* Sidebar */}
        <div
          className={`h-screen p-5 bg-white shadow-lg fixed top-0 transition-all ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            // Add width only for screens medium or larger
            "md:static md:translate-x-0 md:w-64 md:flex-shrink-0"
          }`}
        >
          <div className="p-4">
            <h2 className="text-lg font-bold text-[#6e82a4] mb-6">Dashboard</h2>
            <nav>
              <ul className="space-y-4 pl-4">
                <li>
                  <NavLink
                    to="/instructors"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-[#6e82a4] hover:bg-gray-100 rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${
                            isActive
                              ? "bg-[#17c1e8] text-white"
                              : "bg-[#e9ecef] text-[#3a416f]"
                          }`}
                        >
                          <i className="fas fa-chalkboard-teacher text-xs"></i>
                        </span>
                        Instructors
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/students"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-[#6e82a4] hover:bg-gray-100 rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${
                            isActive
                              ? "bg-[#17c1e8] text-white"
                              : "bg-[#e9ecef] text-[#3a416f]"
                          }`}
                        >
                          <i className="fas fa-user-graduate text-xs"></i>
                        </span>
                        Students
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/courses"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-[#6e82a4] hover:bg-gray-100 rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${
                            isActive
                              ? "bg-[#17c1e8] text-white"
                              : "bg-[#e9ecef] text-[#3a416f]"
                          }`}
                        >
                          <i className="fas fa-book text-xs"></i>
                        </span>
                        Courses
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </aside>
  )
}
