import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import lessonapi from "../../uitils/api/lesson"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { capitalize, formatDate, readFile } from "../../uitils/functions/global"
import ActionButton from "../../components/global/ActionButton"
import { useDelete } from "../../contexts/Delete"

export default function ShowLesson() {
  const { lessonId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [lesson, setLesson] = useState(blueprint.lesson)
  const { destroy } = useDelete()

  useEffect(() => {
    lessonapi.show(lessonId, token, setLesson, handler)
  }, [lessonId])

  return (
    handler.componentLoaded && (
      <DashboardPageCompement title={"specified lesson"}>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
          {/* Course Title */}
          <p className="text-lg font-semibold text-gray-600 mb-2">
            Course: <span className="text-gray-900">{lesson.course.title}</span>
          </p>

          {/* Lesson Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {capitalize(lesson.title)}
          </h1>

          {/* Lesson Content */}
          <div className="relative overflow-hidden rounded-lg shadow-md mb-6">
            <video
              src={readFile(lesson.content)}
              controls
              className="w-[80%] rounded-lg"
            ></video>
          </div>

          {/* Last Updated */}
          <p className="text-sm text-gray-500 italic mb-6">
            Last updated: {formatDate(lesson.updated_at)}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <ActionButton
              name={"Edit"}
              route={`/dashboard/lessons/edit/${lesson.id}`}
              icon={""}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 ease-in-out"
            />
            <ActionButton
              name={"Delete"}
              onClick={() =>
                destroy("/lessons", lesson.id, lesson.title + " lesson")
              }
              icon={""}
              color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
              className=" text-white font-medium py-2 px-6 rounded-lg transition duration-200 ease-in-out"
            />
          </div>
        </div>
      </DashboardPageCompement>
    )
}
