import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/Authentication";
import { useHandler } from "../contexts/Handler";
import Navbar from "../components/global/navbar";
import SideBar from "../components/global/SideBar";
import Courses from "./Courses";
import { role } from "../uitils/functions/constants";
import DashboardHomePage from "../layouts/dashboards";
import NotFound404 from "../layouts/404";
import UpdatePassword from "../layouts/authentication/UpdatePassword";

export default function Dashboard() {
  const {
    credentials: { user },
  } = useAuth()
  const { handler } = useHandler()

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

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
            className={`transition-all ${
              isSidebarOpen ? "w-30" : "w-0"
            } flex-shrink-0`}
          >
            <SideBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
          </div>

          {/* Main Content Area */}
          <div
            className={`flex-1 flex flex-col p-4 transition-all ${
              isSidebarOpen ? "ml-64" : ""
            }`}
          >
            {/* Navbar */}
            <div className="w-full">
              <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pl-6">
              <Routes>
                <Route path="/" element={<DashboardHomePage />} />
                <Route path="/courses/*" element={<Courses />} />
                <Route path="/update-password" element={<UpdatePassword />} />

                {/* Unknow route */}
                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    )
  )
}
