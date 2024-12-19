import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import lessonapi from "../../uitils/api/lesson"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { formatDate } from "../../uitils/functions/global"

export default function ShowLesson() {
  const { lessonId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [lesson, setLesson] = useState(blueprint.lesson)

  useEffect(() => {
    lessonapi.show(lessonId, token, setLesson, handler)
  }, [lessonId])

  return (
    <DashboardPageCompement title={"specified lesson"}>
      <Link to={"./add-lesson"}>Add a new lesson</Link>

      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        {/* Lesson Title */}
        <h1 className="text-xl font-bold text-gray-800 mb-4">{lesson.title}</h1>

        {/* Lesson Content */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {lesson.content}
        </p>

        {/* Last Updated and Actions */}
        <div className="flex justify-between items-center">
          {/* Last Updated */}
          <p className="text-sm text-gray-500 italic">
            Last updated: {formatDate(lesson.updated_at)}
          </p>
        </div>
        {/* Actions */}
        <div className="flex space-x-4">
          <button
            className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 focus:outline-none transition-opacity"
            onClick={() => handleEditLesson(lesson.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none transition-colors"
            onClick={() => handleDeleteLesson(lesson.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </DashboardPageCompement>
  )
}
