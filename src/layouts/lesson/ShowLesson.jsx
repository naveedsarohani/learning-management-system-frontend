import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import lessonapi from "../../uitils/api/lesson"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { formatDate } from "../../uitils/functions/global"
import ActionButton from "../../components/global/ActionButton"
import { useDelete } from "../../contexts/Delete"

export default function ShowLesson() {
  const { lessonId } = useParams()
  const { credentials: { token } } = useAuth()
  const { handler } = useHandler()
  const [lesson, setLesson] = useState(blueprint.lesson)
  const { destroy } = useDelete();

  useEffect(() => {
    lessonapi.show(lessonId, token, setLesson, handler)
  }, [lessonId])

  return (
    <DashboardPageCompement title={"specified lesson"}>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        {/* Lesson Title */}
        <h1>Course: {lesson.course.title}</h1>

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


        <ActionButton
          name={'Edit'}
          route={`/dashboard/lessons/edit/${lesson.id}`}
          icon={''}
        />
        <ActionButton
          name={'Delete'}
          onClick={() => destroy('/lessons', lesson.id, lesson.title + ' lesson')}
          icon={''}
        />
      </div>
    </DashboardPageCompement>
  )
}
