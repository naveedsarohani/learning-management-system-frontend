import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import course from "../../uitils/api/course"
import blueprint from "../../uitils/blueprint"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import auth from "../../uitils/api/auth"
import { capEach, readFile } from "../../uitils/functions/global"
import CourseCard from "../../components/global/CourseCard"

export default function Instructor() {
  const { handler } = useHandler()
  const { instructorId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const [instructor, setInstructor] = useState(blueprint.user)
  const [courses, setCourses] = useState([blueprint.course])

  useEffect(() => {
    course.all(token, setCourses, handler, { user_id: parseInt(instructorId) })
  }, [])

  useEffect(() => {
    courses[0].id && setInstructor(courses[0].user)
  }, [courses])

  return (
    handler.componentLoaded && (
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Instructor Section */}
        <div className="profile flex items-center space-x-6 mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <img
            className="rounded-full w-20 h-20 object-cover"
            src={readFile(instructor.image)}
            alt={`${instructor.name}'s profile`}
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome to,{" "}
              <strong className="text-blue-600">
                {capEach(instructor.name)}
              </strong>
            </h1>
            <p className="text-gray-600 mt-2">
              Your expert instructor for courses on various topics. Learn from
              the best!
            </p>
          </div>
        </div>

        {/* Courses Section */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Courses Offered by {capEach(instructor.name)}
          </h2>
          <p className="text-gray-600 mt-2">
            Explore the wide range of courses that {capEach(instructor.name)}{" "}
            offers. Whether you’re a beginner or an advanced learner, these
            courses will provide you with valuable knowledge and skills.
          </p>
        </div>

        <div className="courses grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    )
  )
}
