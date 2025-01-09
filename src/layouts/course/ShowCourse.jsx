import { useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import courseapi from "../../uitils/api/course"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import lesson from "../../uitils/api/lesson"
import {
  formatDate,
  isNullOrEmpty,
  readFile,
} from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import ActionButton from "../../components/global/ActionButton"
import assessment from "../../uitils/api/assessment"
import Accordion from "../../components/accordion/Accordion"
import AccordionContent from "../../components/accordion/AccordionContent"

export default function ShowCourse() {
  const { courseId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [course, setCourse] = useState(blueprint.course)
  const [currentAssId, setCurrentAssId] = useState(null)
  const [currentLessonId, setCurrentLessonId] = useState(null)
  const [lessons, setLessons] = useState([blueprint.lesson])
  const [assessments, setAssessments] = useState([blueprint.assessment])
  const { destroy } = useDelete()


  useEffect(() => {
    courseapi.show(courseId, token, setCourse, handler)
    lesson.all(token, setLessons, handler, { course_id: parseInt(courseId) })
    assessment.all(token, setAssessments, handler, { course_id: parseInt(courseId) })
  }, [courseId])

  return handler.componentLoaded && <DashboardPageCompement title={"specified course"}>
    <div className="flex justify-between p-2">
      <ActionButton
        name={"Add a New Lesson"}
        route={"./add-lesson"}
        icon={""}
      />
      <ActionButton
        name={"Add a New Assessment"}
        route={"./add-assessment"}
        icon={""}
      />
    </div>
    {/* Course Title and Description */}
    <div className="bg-white shadow-md rounded-lg p-5 mb-6">
      <h1 className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent text-3xl font-bold">
        {course.title}
      </h1>
      <p className="text-gray-600 mt-2 mb-5">{course.description}</p>

      {/* action buttons */}
      <div className="flex gap-2 mb-8">
        <ActionButton
          name={"Edit"}
          route={`/dashboard/courses/edit/${course.id}`}
          icon={""}
        />
        <ActionButton
          name={"Delete"}
          icon={""}
          color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
          onClick={() =>
            destroy("/courses", course.id, course.title + " course")
          }
        />
      </div>

      {/* Lessons */}
      <Accordion title={"course lessons"}>
        {!isNullOrEmpty(lessons) &&
          lessons.map((lesson) => (
            <AccordionContent
              itemId={lesson.id}
              tabTitle={lesson.title}
              currentTab={{ value: currentLessonId, set: setCurrentLessonId }}
              identity={"lesson"}
            >
              <video
                src={readFile(lesson.content)}
                controls
                width={600}
              ></video>
              <span className="text-sm text-gray-500 block mb-4">
                {formatDate(lesson.created_at)}
              </span>
            </AccordionContent>
          ))}
      </Accordion>

      {/* Assessments */}
      <Accordion title={"course assessments"}>
        {!isNullOrEmpty(assessments) &&
          assessments.map((assessment) => (
            <AccordionContent
              itemId={assessment.id}
              tabTitle={assessment.title}
              currentTab={{ value: currentAssId, set: setCurrentAssId }}
              identity={"assessment"}
            >
              <div className="p-4 border border-gray-300 rounded-md bg-white shadow-sm mb-4">
                {/* Title */}
                <h1 className="text-lg font-semibold text-gray-800 mb-2">
                  {assessment.title}
                </h1>

                {/* Information */}
                <div className="text-gray-600 text-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <p>
                    <span className="font-medium text-gray-700">Type:</span>{" "}
                    {assessment.type}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Total Retakes:
                    </span>{" "}
                    {assessment.retakes_allowed}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">
                      Allowed Time:
                    </span>{" "}
                    {assessment.time_limit}
                  </p>
                </div>

                {/* Date */}
                <span className="text-xs text-gray-500 block mt-4">
                  Created on: {formatDate(assessment.created_at)}
                </span>
              </div>
            </AccordionContent>
          ))}
      </Accordion>
    </div>
  </DashboardPageCompement>
}
