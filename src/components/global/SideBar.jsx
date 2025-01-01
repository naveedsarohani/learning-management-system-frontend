import { Link, NavLink } from "react-router-dom"
import { RiMenuUnfoldFill } from "react-icons/ri"
import { RiMenuUnfold2Fill } from "react-icons/ri"
import { MdAssignment } from "react-icons/md"
import { BsQuestionSquareFill } from "react-icons/bs"
import { MdQuestionAnswer } from "react-icons/md"
import { MdTask } from "react-icons/md"
import { MdPlayLesson } from "react-icons/md"

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
          className={`h-screen p-5 bg-gradient-to-r from-[#21bffd] to-[#217bfe] shadow-lg fixed top-0 transition-all ${isOpen ? "translate-x-0" : "-translate-x-full"
            } ${
            // Add width only for screens medium or larger
            "md:static md:translate-x-0 md:w-64 md:flex-shrink-0"
            }`}
        >
          <div className="p-4">
            <Link to='/dashboard'>
              <h2 className="text-lg font-bold text-white mb-6">Dashboard</h2></Link>
            <nav>
              <ul className="space-y-4 pl-4">
                <li>
                  <NavLink
                    to="/dashboard/instructors"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-white hover:bg-gray-100 hover:text-[#424767] rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive
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
                    to="/dashboard/students"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-white hover:bg-gray-100 hover:text-[#424767] rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive
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
                        : "flex items-center px-4 py-2 text-white hover:bg-gray-100 hover:text-[#424767] rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive
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
                <li>
                  <NavLink
                    to="/dashboard/lessons"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-white hover:bg-gray-100 hover:text-[#424767] rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive
                            ? "bg-[#17c1e8] text-white"
                            : "bg-[#e9ecef] text-[#3a416f]"
                            }`}
                        >
                          <MdPlayLesson />
                        </span>
                        Lessons
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/exams"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-white hover:bg-gray-100 hover:text-[#424767] rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive
                            ? "bg-[#17c1e8] text-white"
                            : "bg-[#e9ecef] text-[#3a416f]"
                            }`}
                        >
                          <MdQuestionAnswer />
                        </span>
                        Exams
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/results"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-white hover:bg-gray-100 hover:text-[#424767] rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive
                            ? "bg-[#17c1e8] text-white"
                            : "bg-[#e9ecef] text-[#3a416f]"
                            }`}
                        >
                          <BsQuestionSquareFill />
                        </span>
                        Exams Result
                      </>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/assessments"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-white hover:bg-gray-100 hover:text-[#424767] rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive
                            ? "bg-[#17c1e8] text-white"
                            : "bg-[#e9ecef] text-[#3a416f]"
                            }`}
                        >
                          <MdAssignment />
                        </span>
                        Assessments
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/submissions"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center px-4 py-2 text-[#424767] bg-blue-100 rounded-lg"
                        : "flex items-center px-4 py-2 text-white hover:bg-gray-100 hover:text-[#424767] rounded-lg"
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-lg mr-3 ${isActive
                            ? "bg-[#17c1e8] text-white"
                            : "bg-[#e9ecef] text-[#3a416f]"
                            }`}
                        >
                          <MdTask />
                        </span>
                        Submissions
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
