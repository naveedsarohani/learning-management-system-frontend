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
  where,
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
import VideoPlayer from "../../components/global/VideoPlayer"
import submission from "../../uitils/api/submission"
import ActionButton from "../../components/global/ActionButton"

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
  const [preSubmissions, setPreSubmissions] = useState([blueprint.submission])
  const [progress, setProgress] = useState(blueprint.progress)
  const [enrolledUsers, setEnrolledUsers] = useState([])
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [currentLessonId, setCurrentLessonId] = useState(null)
  const [currentAssId, setCurrentAssId] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [currentVideoIndex, setCurrentVideoindex] = useState(0)

  useEffect(() => {
    token && enrollment.all(token, setEnrolledUsers, handler, {
      course_id: parseInt(courseId),
      getOnlyProperty: "user_id",
    })
    courseapi.show(courseId, token, setCourse, handler)
    token && assessment.all(token, setAssessments, handler, {
      course_id: parseInt(courseId),
    })
    lesson.all(token, setLessons, handler, { course_id: courseId })
    token && question.all(token, setQuestions, handler, {
      getOnlyProperty: "assessment_id",
    })
    token && submission.all(token, setPreSubmissions, handler);
  }, [])

  useEffect(() => {
    setIsEnrolled(enrolledUsers.includes(user.id))
  }, [enrolledUsers])

  useEffect(() => {
    token && progressapi.show(courseId, token, setProgress, handler)
  }, [isEnrolled, videoEnded])

  useEffect(() => {
    !isNullOrEmpty(progress) && setCurrentVideoindex(progress.lesson_index);
  }, [progress]);

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
                {isEnrolled && !isNullOrEmpty(lessons[0].id)
                  ? <VideoPlayer
                    key={currentVideoIndex}
                    videos={where(lessons, { getOnlyProperty: 'content' })}
                    playing={currentVideoIndex}
                    setEnded={setVideoEnded}
                  />
                  : <img
                    src={readFile(course.image)}
                    alt={course.title}
                    className="w-screen  rounded-lg object-cover max-h-[20rem]"
                  />}
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
              {!isEnrolled && <div className="enroll-button mt-8 flex justify-center">
                {token ? <ActionButton
                  name={'Enroll Now'}
                  onClick={() => setShowEnrollmentForm(true)}
                  color="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700"
                /> : <ActionButton
                  name={'Login to enroll'}
                  route={'/auth/login'}
                  color="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700"
                />}
              </div>
              }
            </div>

            {isEnrolled && <div className="course-content bg-white shadow-md rounded-lg p-6">
              <div>
                <Accordion title="Course Content">
                  {!isNullOrEmpty(lessons[0]) ? (
                    lessons.map((lesson, index) => (
                      <AccordionContent
                        key={lesson.id}
                        currentPlaying={currentVideoIndex == index}
                        tabTitle={capitalize(lesson.title)}
                        itemId={lesson.id}
                        currentTab={{
                          value: currentLessonId,
                          set: setCurrentLessonId,
                        }}
                        noAction={true}
                        isLocked={
                          !isEnrolled || index > progress.lesson_index
                        }
                      >
                        {isEnrolled && index <= progress.lesson_index && (
                          <LessonCard
                            key={lesson.id}
                            showTitle={false}
                            lesson={lesson}
                            clickToPlay={() => {
                              setCurrentVideoindex(index);
                            }}
                          />
                        )}
                      </AccordionContent>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-32 bg-gray-100 rounded-lg">
                      <NoContent message="There are no lessons for this course" />
                    </div>
                  )}
                </Accordion>
              </div>
            </div>
            }

            {!isEnrolled && (
              <div className="course-content bg-white shadow-md rounded-lg p-6">
                <div>
                  <Accordion title="Course Content">
                    {!isNullOrEmpty(lessons[0]) ? (
                      lessons.map((lesson, index) => <AccordionContent
                        key={lesson.id}
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
            )}

            {isEnrolled && (
              <div className="course-content bg-white shadow-md rounded-lg p-6">
                <div>
                  <Accordion title="course assessments">
                    {!isNullOrEmpty(assessments[0]) ? (
                      assessments.map(
                        (assessment) =>
                          questions.includes(assessment.id) && (
                            <AccordionContent
                              key={assessment.id}
                              tabTitle={capitalize(assessment.title)}
                              hoverTitle={`The assessment will be unlocked at ${assessment.unlocks_at}% of course completion`}
                              itemId={assessment.id}
                              currentTab={{
                                value: currentAssId,
                                set: setCurrentAssId,
                              }}
                              noAction={true}
                              isLocked={
                                parseFloat(progress.completion_percentage) <
                                parseFloat(assessment.unlocks_at)
                              }
                            >
                              {parseFloat(progress.completion_percentage) >=
                                parseFloat(assessment.unlocks_at) && (
                                  <AssessmentCard submission={preSubmissions.find(submission => submission.assessment_id == assessment.id)} assessment={assessment} />
                                )}
                            </AccordionContent>
                          )
                      )
                    ) : (
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
