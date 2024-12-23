import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import courseapi from "../../uitils/api/course"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import lesson from "../../uitils/api/lesson"
import { formatDate, isNullOrEmpty, readFile, where } from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"
import ActionButton from '../../components/global/ActionButton';
import assessment from "../../uitils/api/assessment"
import Accordion from "../../components/accordion/Accordion"
import AccordionContent from "../../components/accordion/AccordionContent"

export default function ShowCourse() {
  const { courseId } = useParams()
  const { credentials: { token } } = useAuth()
  const { handler } = useHandler()
  const [course, setCourse] = useState(blueprint.course)
  const [lessons, setLessons] = useState([blueprint.lesson])
  const [assessments, setAssessments] = useState([blueprint.assessment])
  const { destroy } = useDelete()
  const [activeLesson, setActiveLesson] = useState(null)
  const [activeAssessment, setActiveAssessment] = useState(null)

  const toggleLesson = (lessonId) => {
    setActiveLesson((prev) => (prev === lessonId ? null : lessonId))
  }
  const toggleAssessment = (assessmentId) => {
    setActiveAssessment((prev) => (prev === assessmentId ? null : assessmentId))
  }

  useEffect(() => {
    courseapi.show(courseId, token, setCourse, handler)
    lesson.all(token, setLessons, handler, { course_id: courseId })
    assessment.all(token, setAssessments, handler, { course_id: courseId })
  }, [courseId]);

  return (
    <DashboardPageCompement title={"specified course"}>

      <ActionButton
        name={'Add a New Lesson'}
        route={'./add-lesson'}
        icon={''}
      />
      <ActionButton
        name={'Add a New Assessment'}
        route={'./add-assessment'}
        icon={''}
      />

      {/* Course Title and Description */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-6">
        <h1 className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent text-3xl font-bold">
          {course.title}
        </h1>
        <p className="text-gray-600 mt-2">{course.description}</p>

        {/* action buttons */}
        <ActionButton
          name={'Delete'}
          icon={''}
          onClick={() => destroy('/courses', course.id, course.title + ' course')}
        />

        <ActionButton
          name={'Edit'}
          route={`/dashboard/courses/edit/${course.id}`}
          icon={''}
        />

        {/* Lessons */}
        <Accordion title={'course lessons'}>
          {!isNullOrEmpty(lessons) && lessons.map(lesson => <AccordionContent
            itemId={lesson.id}
            tabTitle={lesson.title}
            identity={'lesson'}
          >
            <video src={readFile(lesson.content)} controls></video>
            <span className="text-sm text-gray-500 block mb-4">
              {formatDate(lesson.created_at)}
            </span>
          </AccordionContent>)}
        </Accordion>

        {/* Assessments */}
        <Accordion title={'course assessments'}>
          {!isNullOrEmpty(assessments) && assessments.map(assessment => <AccordionContent
            itemId={assessment.id}
            tabTitle={assessment.title}
            identity={'assessment'}
          >
            <h1>{assessment.title}</h1>
            <p>Type: {assessment.type} | Total Retakes: {assessment.retakes_allowed} | Allowed Time: {assessment.time_limit}</p>
            <span className="text-sm text-gray-500 block mb-4">
              {formatDate(assessment.created_at)}
            </span>
          </AccordionContent>)}
        </Accordion>
      </div>
    </DashboardPageCompement>
  )
}
