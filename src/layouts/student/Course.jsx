import React, { useState, useEffect } from "react"
import blueprint from "../../uitils/blueprint"
import courseapi from "../../uitils/api/course"
import lesson from "../../uitils/api/lesson"
import { useParams } from "react-router-dom"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import {
  capEach,
  capitalize,
  formatDate,
  isNullOrEmpty,
  readFile,
} from "../../uitils/functions/global"
import NoContent from "../../components/global/NoContent"
import LessonCard from "../../components/global/LessonCard"

const Course = () => {
  const { courseId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [course, setCourse] = useState(blueprint.course)
  const [lessons, setLessons] = useState([blueprint.lesson])

  useEffect(() => {
    courseapi.show(courseId, token, setCourse, handler)
    lesson.all(token, setLessons, handler, { course_id: courseId })
  }, [])

  return (
    <div className="course-page px-6 py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Container: Course Details */}
        <div className="course-details bg-white shadow-md rounded-lg p-6 lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center lg:text-left">
            {capitalize(course.title)}
          </h1>
          <div className="course-image mb-4">
            <img
              src={readFile(course.image)}
              alt={course.title}
              className="w- h-[20rem] rounded-lg object-cover"
            />
          </div>
          <p className="text-gray-700 mb-4">{capitalize(course.description)}</p>
          <p className="text-gray-600 mb-4 flex items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={readFile(course.user.image)}
              alt=""
            />
            <span className="font-semibold text-gray-800">
              {capEach(course.user.name)} ({capitalize(course.user.role)})
            </span>
          </p>
          <div className="course-meta">
            <p className="text-sm text-gray-600 mb-1">
              <strong>Created at:</strong> {formatDate(course.updated_at)}
            </p>
          </div>
          {/* Enroll Button */}
          <div className="enroll-button mt-8 flex justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700">
              Enroll Now
            </button>
          </div>
        </div>

        {/* Right Container: Course Lessons */}
        <div className="course-content bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Course Content
          </h2>
          <div>
            {!isNullOrEmpty(lessons[0].id) ? (
              lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))
            ) : (
              <div className="flex justify-center items-center h-32 bg-gray-100 rounded-lg">
                <NoContent message="There are no lessons for this course" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course
