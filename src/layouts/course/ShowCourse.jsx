import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import courseapi from "../../uitils/api/course"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import lesson from "../../uitils/api/lesson"
import { formatDate } from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"

export default function ShowCourse() {
  const { courseId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [course, setCourse] = useState(blueprint.course)
  const [lessons, setLessons] = useState([blueprint.lesson])
  const { destroy } = useDelete()
  const [activeLesson, setActiveLesson] = useState(null)

  const toggleLesson = (lessonId) => {
    setActiveLesson((prev) => (prev === lessonId ? null : lessonId))
  }

  useEffect(() => {
    courseapi.show(courseId, token, setCourse, handler)
    lesson.courseLesson(courseId, token, setLessons, handler)
  }, [courseId])

  return (
    <DashboardPageCompement title={"specified course"}>
      <Link
        to={"./add-lesson"}
        className="text-blue-600 underline mb-4 inline-block"
      >
        Add a new lesson
      </Link>

      {/* Course Title and Description */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h1 className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent text-3xl font-bold">
          {course.title}
        </h1>
        <p className="text-gray-600 mt-2">{course.description}</p>
        {/* Lessons */}
        <div className="">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Lessons</h2>
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="border border-gray-300 rounded-lg overflow-hidden shadow-sm"
              >
                {/* Accordion Header */}
                <div
                  className="w-full bg-gradient-to-r   from-[#25bffd] to-[#257bfe]  text-white p-1 text-left font-medium  focus:outline-none"
                  onClick={() => toggleLesson(lesson.id)}
                >
                  <div className="flex p-2 rounded justify-between items-center w-full  order-10">
                    {lesson.title}
                    {activeLesson ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </div>
                </div>

                {/* Accordion Content */}
                {activeLesson === lesson.id && (
                  <div className="p-4 bg-gray-50">
                    <p className="text-gray-700 mb-2">{lesson.content}</p>
                    <span className="text-sm text-gray-500 block mb-4">
                      {formatDate(lesson.created_at)}
                    </span>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                      onClick={() =>
                        destroy("/lessons", lesson.id, lesson.title + " lesson")
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardPageCompement>
  )
}
