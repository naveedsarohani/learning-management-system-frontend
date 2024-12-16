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

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        {/* Lesson Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {lesson.title}
        </h1>

        {/* Lesson Content */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          {lesson.content}
        </p>

        {/* Last Updated */}
        <p className="text-sm text-gray-500 italic">
          Last updated: {formatDate(lesson.updated_at)}
        </p>
      </div>
    </DashboardPageCompement>
  )
}
