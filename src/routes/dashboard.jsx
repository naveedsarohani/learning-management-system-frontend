import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts/Authentication"
import { useHandler } from "../contexts/Handler"
import Navbar from "../components/global/navbar"
import SideBar from "../components/global/SideBar"
import Courses from "./Course"
import { role } from "../uitils/functions/constants"
import DashboardHomePage from "../layouts/dashboards"
import NotFound404 from "../layouts/404"
import Lesson from "./Lesson"
import Assessment from "./Assessment"
import Users from "../layouts/users/Users"
import Submission from "./Submission"
import Exam from "./Exam"
import Result from "./Result"
import Loader from "../components/global/Loader"

export default function Dashboard() {
  const { credentials: { user } } = useAuth()
  const { handler } = useHandler()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    if (user) {
      if (![role.ADMIN, role.INSTRUCTOR].includes(user.role))
        handler.navigate(-1)
    } else handler.navigate("/auth/login", { replace: true })
  }, [handler.navigate, user])

  return (
    user &&
    [role.ADMIN, role.INSTRUCTOR].includes(user.role) && (
      <>
        <div className="flex h-screen">
          {/* Sidebar */}
          <div
            className={`fixed md:static transition-transform top-0 left-0 z-10 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0`}
          >
            <SideBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <div className="w-full">
              <Navbar />
            </div>

            <div className="relative top-[35%]">
              {!handler.componentLoaded && <Loader />}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pl-6">
              <Routes>
                <Route path="/" element={<DashboardHomePage />} />
                <Route path="/instructors" key='instructors' element={<Users role='instructor' />} />
                <Route path="/students" key='student' element={<Users role='student' />} />
                <Route path="/courses/*" element={<Courses />} />
                <Route path="/exams/*" element={<Exam />} />
                <Route path="/results/*" element={<Result />} />
                <Route path="/lessons/*" element={<Lesson />} />
                <Route path="/assessments/*" element={<Assessment />} />
                <Route path="/submissions/*" element={<Submission />} />

                {/* Unknown Route */}
                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    )
  )
}
