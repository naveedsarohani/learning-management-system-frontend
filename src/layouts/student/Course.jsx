import React, { useState, useEffect } from "react"
import blueprint from "../../uitils/blueprint"
import courseapi from "../../uitils/api/course"
import assessment from "../../uitils/api/assessment"
import lesson from "../../uitils/api/lesson"
import { Link, useParams } from "react-router-dom"
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
import EnrollmentForm from "../../components/global/EnrollmentForm"
import enrollment from "../../uitils/api/enrollment"
import Accordion from "../../components/accordion/Accordion"
import AccordionContent from "../../components/accordion/AccordionContent"
import AssessmentCard from "../../components/global/AssessmentCard"
import progressapi from "../../uitils/api/progress"
import ProgressBar from "../../components/global/ProgressBar"
import question from "../../uitils/api/question"

const Course = () => {
  const { courseId } = useParams()
  const {
    credentials: { token, user },
  } = useAuth()
  const { handler } = useHandler()
  const [course, setCourse] = useState(blueprint.course)
  const [assessments, setAssessments] = useState([blueprint.assessment])
  const [questions, setQuestions] = useState([blueprint.question])
  const [lessons, setLessons] = useState([blueprint.lesson])
  const [progress, setProgress] = useState(blueprint.progress)
  const [enrolledUsers, setEnrolledUsers] = useState([])
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [currentLessonId, setCurrentLessonId] = useState(null)
  const [currentAssId, setCurrentAssId] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)

  const setUnlockNext = async index => {

    const newProgress = {
      completion_percentage: calcPercetage(lessons.length, index),
      lesson_index: index + 1
    };

    await progressapi.update(courseId, newProgress, token, handler).then(() => {
      setVideoEnded(pre => !pre);
    });
  };

  const calcPercetage = (total, given, option = null) => {
    return (given / total) * 100;
  };

  useEffect(() => {
    enrollment.all(token, setEnrolledUsers, handler, { course_id: parseInt(courseId), getOnlyProperty: "user_id" })
    courseapi.show(courseId, token, setCourse, handler)
    assessment.all(token, setAssessments, handler, { course_id: parseInt(courseId) })
    lesson.all(token, setLessons, handler, { course_id: parseInt(courseId) })
    question.all(token, setQuestions, handler, { getOnlyProperty: 'assessment_id' })
  }, [])

  useEffect(() => {
    setIsEnrolled(enrolledUsers.includes(user.id))
  }, [enrolledUsers])

  useEffect(() => {
    progressapi.show(courseId, token, setProgress, handler);
  }, [isEnrolled, videoEnded])

  return (
    handler.componentLoaded && (
      <>
        {showEnrollmentForm && (
          <EnrollmentForm
            course={course}
            userId={user.id}
            token={token}
            set={setShowEnrollmentForm}
            handler={handler}
            setEnrolled={setIsEnrolled}
          />
        )}

        <div className="course-page px-6 py-8 bg-gray-50 min-h-screen">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Container: Course Details */}
            <div className="course-details bg-white shadow-md rounded-lg p-6 lg:col-span-2">
              {isEnrolled && <ProgressBar progress={progress} />}
              <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                {capitalize(course.title)}
              </h1>
              <div className="course-image mb-4">
                <img
                  src={readFile(course.image)}
                  alt={course.title}
                  className="w-screen  rounded-lg object-cover"
                />
              </div>
              <p className="text-gray-700 mb-4">
                {capitalize(course.description)}
              </p>
              <Link
                to={`/instructor/${course.user.id}`}
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md transition hover:shadow-lg"
              >
                <img
                  className="w-16 h-16 rounded-full border-2 border-indigo-500 object-cover"
                  src={readFile(course.user.image)}
                  alt="Instructor"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {capEach(course.user.name)}{" "}
                    <span className="text-sm text-indigo-500">
                      ({capitalize(course.user.role)})
                    </span>
                  </h4>
                  <div className=" rounded-lg shadow-sm">
                    <p className="text-xs text-gray-600 ">
                      <span className="font-medium text-gray-800">
                        Last update:
                      </span>{" "}
                      {formatDate(course.updated_at)}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Enroll Button */}
              {!isEnrolled && (
                <div className="enroll-button mt-8 flex justify-center">
                  <button
                    onClick={() => setShowEnrollmentForm(true)}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700"
                  >
                    Enroll Now
                  </button>
                </div>
              )}
            </div>

            {<div className="course-content bg-white shadow-md rounded-lg p-6">
              <div>
                <Accordion title="Course Content">
                  {!isNullOrEmpty(lessons[0]) ? (
                    lessons.map((lesson, index) => (

                      <AccordionContent
                        tabTitle={capitalize(lesson.title)}
                        itemId={lesson.id}
                        currentTab={{
                          value: currentLessonId,
                          set: setCurrentLessonId,
                        }}
                        noAction={true}
                        isLocked={!isEnrolled || index > progress.lesson_index}
                      >
                        {isEnrolled && index <= progress.lesson_index && <LessonCard
                          key={lesson.id}
                          showTitle={false}
                          lesson={lesson}
                          next={() => setUnlockNext(index + 1)}
                          showControls={true}
                        />}
                      </AccordionContent>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-32 bg-gray-100 rounded-lg">
                      <NoContent message="There are no lessons for this course" />
                    </div>
                  )}
                </Accordion>
              </div>
            </div>}

            {/* {!isEnrolled && (
              <div className="course-content bg-white shadow-md rounded-lg p-6">
                <div>
                  <Accordion title="Course Content">
                    {!isNullOrEmpty(lessons[0]) ? (
                      lessons.map((lesson, index) => <AccordionContent
                        tabTitle={capitalize(lesson.title)}
                        itemId={lesson.id}
                        currentTab={{
                          value: currentLessonId,
                          set: setCurrentLessonId,
                        }}
                        isLocked={true}
                      ></AccordionContent>
                      ))
                      : (
                        <div className="flex justify-center items-center h-32 bg-gray-100 rounded-lg">
                          <NoContent message="There are no lessons for this course" />
                        </div>
                      )}
                  </Accordion>
                </div>
              </div>
            )} */}

            {isEnrolled && (
              <div className="course-content bg-white shadow-md rounded-lg p-6">
                <div>
                  <Accordion title="course assessments">
                    {!isNullOrEmpty(assessments[0]) ? (
                      assessments.map((assessment) => questions.includes(assessment.id) && <AccordionContent
                        tabTitle={capitalize(assessment.title)}
                        hoverTitle={`The assessment will be unlocked at ${assessment.unlocks_at}% of course completion`}
                        itemId={assessment.id}
                        currentTab={{
                          value: currentAssId,
                          set: setCurrentAssId,
                        }}
                        noAction={true}
                        isLocked={parseFloat(progress.completion_percentage) < parseFloat(assessment.unlocks_at)}
                      >
                        {(parseFloat(progress.completion_percentage) >= parseFloat(assessment.unlocks_at)) && <AssessmentCard assessment={assessment} />}
                      </AccordionContent>
                      ))
                      : (
                        <div className="flex justify-center items-center h-32 bg-gray-100 rounded-lg">
                          <NoContent message="There are no assessments for this course" />
                        </div>
                      )}
                  </Accordion>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  )
}

export default Course
