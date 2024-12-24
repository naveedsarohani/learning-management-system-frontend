import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/Authentication";
import { useHandler } from "../contexts/Handler";
import NotFound404 from "../layouts/404";
import { role } from "../uitils/functions/constants";
import { useEffect, useState } from "react";
import Navbar from "../components/global/navbar";
import StudentProfile from "../layouts/student/StudentProfile";

export default function Student() {
    const { credentials: { user } } = useAuth();
    const { handler } = useHandler();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        if (user) {
            if (user.role !== role.STUDENT) handler.navigate(-1);
        } else handler.navigate('/auth/login', { replace: true });
    }, [handler.navigate, user]);

    return (
        user && role.STUDENT === user.role && (
            <>
                <div className="flex h-screen">
                    {/* Sidebar */}
                    <div
                        className={`fixed md:static transition-transform z-10 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                            } md:translate-x-0`}
                    >
                        {/* <SideBar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} /> */}
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col p-4">
                        {/* Navbar */}
                        <div className="w-full">
                            <Navbar />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 overflow-y-auto pl-6">
                            <Routes>
                                <Route path="/" element={<StudentProfile />} />
                                <Route path="/courses/:courseId" element={<StudentProfile />} />

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