import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/Authentication"
import course from "../../uitils/api/course"
import { useHandler } from "../../contexts/Handler"
import blueprint from "../../uitils/blueprint"
import CourseCard from "../../components/global/CourseCard"
import InstructorCard from "../../components/global/InstructorCard"
import auth from "../../uitils/api/auth"

export default function Home() {
  const {
    credentials: { user, token },
  } = useAuth()
  const [instructors, setInstructors] = useState([blueprint.user])
  const [courses, setCourses] = useState([blueprint.course])
  const { handler } = useHandler()

  useEffect(() => {
    course.all(token, setCourses, handler)
    auth.users(token, setInstructors, handler, { role: "instructor" })
  }, [location.pathname, user])

  return (
    handler.componentLoaded && (
      <div className="bg-gray-50 min-h-screen">
        {/* Courses Section */}
        <div className="p-10">
          <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent  mb-8">
            Explore Our Top-Rated Courses
          </h1>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Unlock your potential with our expertly crafted courses. Find the
            perfect one for your goals!
          </p>
          <div className="flex justify-center flex-wrap gap-10">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        <hr className="border-t-2 border-gray-200 my-10" />

        {/* Instructors Section */}
        <div className="p-10 bg-white shadow-lg rounded-lg">
          <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent mb-8">
            Meet Our Expert Instructors 🌟
          </h1>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Learn from the best! Our instructors are industry leaders dedicated
            to your success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        </div>
      </div>
    )
  )
}
