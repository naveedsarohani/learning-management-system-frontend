import { Route, Routes } from "react-router-dom"
import { useAuth } from "../contexts/Authentication"
import { useHandler } from "../contexts/Handler"
import NotFound404 from "../layouts/404"
import { role } from "../uitils/functions/constants"
import { useEffect, useState } from "react"
import Navbar from "../components/global/navbar"
import StudentProfile from "../layouts/student"
import Home from "../layouts/student"
import Menu from "../components/global/Menu"
import MyCourses from "../layouts/student/MyCourses"
import MyExams from "../layouts/student/MyExams"
import MyAssessments from "../layouts/student/MyAssessments"
import Course from "../layouts/student/Course"
import Loader from "../components/global/Loader"
import AttemptExam from "../layouts/student/AttemptExam"
import AttemptAssessment from "../layouts/student/AttemptAssessment"

export default function Student() {
  const {
    credentials: { user },
  } = useAuth()
  const { handler } = useHandler()

  useEffect(() => {
    if (user) {
      if (user.role !== role.STUDENT) handler.navigate(-1)
    } else handler.navigate("/auth/login", { replace: true })
  }, [handler.navigate, user])

  return (
    user &&
    role.STUDENT === user.role && (
      <>
        <div className="flex h-screen">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <div className="w-full">
              <Navbar />
            </div>

            {/* navigational links */}
            <div>
              <Menu />
            </div>
            <div className="relative top-[30%]">
              {!handler.componentLoaded && <Loader />}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<MyCourses />} />
                <Route path="/courses/:courseId" element={<Course />} />
                <Route path="/exams" element={<MyExams />} />
                <Route path="/exams" element={<MyExams />} />
                <Route path="/assessments" element={<MyAssessments />} />
                <Route path="/assessments" element={<MyAssessments />} />

                <Route
                  path="/exams/:examId/attempt"
                  element={<AttemptExam />}
                />
                <Route
                  path="/courses/:courseId/attempt-assessment/:assessmentId"
                  element={<AttemptAssessment />}
                />

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
