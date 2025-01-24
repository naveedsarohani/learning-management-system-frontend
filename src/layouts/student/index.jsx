import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import course from "../../uitils/api/course"
import blueprint from "../../uitils/blueprint"
import CourseCard from "../../components/global/CourseCard"
import { isNullOrEmpty } from "../../uitils/functions/global"
import NoContent from "../../components/global/NoContent"

export default function Home() {
  const {
    credentials: { user, token },
  } = useAuth()
  const [courses, setCourses] = useState([blueprint.course])
  const { handler } = useHandler()

  useEffect(() => {
    course.all(token, setCourses, handler)
  }, [location.pathname, user])

  return handler.componentLoaded && <div className="bg-gray-50 min-h-screen p-6 px-14">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">All Courses</h1>
    {!isNullOrEmpty(courses[0].id) ? (
      <div className="flex justify-start flex-wrap gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            routePrefix="/me"
            course={course}
            className="shadow-md hover:shadow-lg transition-shadow"
          />
        ))}
      </div>
    ) : (
      <div className="flex items-center justify-center mt-12">
        <NoContent
          message="There is no course for you"
          className="text-gray-500 text-center"
        />
      </div>
    )}
  </div>
}
