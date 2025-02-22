import { Route, Routes } from "react-router-dom"
import Navbar from "../components/global/navbar"
import NotFound404 from "../layouts/404"
import Home from "../layouts/public"
import Course from "../layouts/student/Course"
import { useHandler } from "../contexts/Handler"
import Loader from "../components/global/Loader"
import Instructor from "../layouts/public/Instructor"

export default function Public() {
    const { handler: { componentLoaded } } = useHandler();

    return <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ">
            {/* Navbar */}
            <div className="w-full">
                <Navbar />
            </div>

            <div className="relative top-[35%]">
                {!componentLoaded && <Loader />}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto pl-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses/:courseId" element={<Course />} />
                    <Route path="/instructor/:instructorId" element={<Instructor />} />

                    {/* Unknown Route */}
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
            </div>
        </div>
    </div>
}
