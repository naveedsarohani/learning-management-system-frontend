import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts/Authentication"
import { useHandler } from "../contexts/Handler"
import Navbar from "../components/global/navbar"
import SideBar from "../components/global/SideBar"
import Courses from "./Courses"
import { role } from "../uitils/functions/constants"
import DashboardHomePage from "../layouts/dashboards"
import NotFound404 from "../layouts/404"
import UpdatePassword from "../layouts/authentication/UpdatePassword"
import Lesson from "./Lesson"
import Assessment from "./Assessment"
import Question from "./Question"

export default function Dashboard() {
  const {
    credentials: { user },
  } = useAuth()
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
            className={`fixed md:static transition-transform top-0 left-0 z-10 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <SideBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col ">
            {/* Navbar */}
            <div className="w-full">
              <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pl-6">
              <Routes>
                <Route path="/" element={<DashboardHomePage />} />
                <Route path="/courses/*" element={<Courses />} />
                <Route path="/lessons/*" element={<Lesson />} />
                <Route path="/assessments/*" element={<Assessment />} />
                <Route path="/questions/*" element={<Question />} />

                <Route path="/update-password" element={<UpdatePassword />} />

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
