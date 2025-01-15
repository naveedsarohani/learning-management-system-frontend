import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import exam from "../../uitils/api/exam"
import blueprint from "../../uitils/blueprint"
import ExamCard from "../../components/global/ExamCard"
import { isNullOrEmpty } from "../../uitils/functions/global"
import NoContent from "../../components/global/NoContent"
import submission from "../../uitils/api/exam_submission"
import question from "../../uitils/api/exam_question"

export default function MyExams() {
  const {
    credentials: { user, token },
  } = useAuth()
  const [exams, setExams] = useState([blueprint.exam])
  const [questions, setQuestions] = useState([])
  const [submissions, setSubmissions] = useState([])
  const { handler } = useHandler()

  useEffect(() => {
    exam.all(token, setExams, handler)
    question.all(token, setQuestions, handler, { getOnlyProperty: "exam_id" })
    submission.all(token, setSubmissions, handler, {
      getOnlyProperty: "exam_id",
    })
  }, [location.pathname, user])

  console.log(questions)

  return (
    handler.componentLoaded && (
      <div className="px-4 py-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Exams</h1>
        {!isNullOrEmpty(exams[0].id) ? (
          <div className="flex justify-center flex-wrap gap-6">
            {exams.map(
              (exam) =>
                questions.includes(exam.id) && (
                  <ExamCard
                    exam={exam}
                    key={exam.id}
                    countDown={exam.starts_at}
                    isAttempted={submissions.includes(exam.id)}
                    examId={exam.id}
                  />
                )
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 bg-white shadow rounded-lg">
            <NoContent message="There is not any exam or test for you" />
          </div>
        )}
      </div>
    )
  )
}
