import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import questionapi from "../../uitils/api/question"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { formatDate } from "../../uitils/functions/global"

export default function ShowQuestion() {
  const { questionId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [question, setQuestion] = useState(blueprint.question)

  useEffect(() => {
    questionapi.show(questionId, token, setQuestion, handler)
  }, [questionId])

  return (
    <DashboardPageCompement title={"specified question"}>
      <Link to={"./add-question"}>Add a new question</Link>

      <div className="p-6 bg-gray-50  flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {question.question_text}
          </h1>

          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-semibold text-gray-600 mr-2">Type:</span>
              <p className="text-gray-700">{question.type}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-600 mr-2">
                Created At:
              </span>
              <p className="text-gray-700">{formatDate(question.created_at)}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white font-semibold rounded-md shadow hover:opacity-90 transition-opacity">
              Edit Question
            </button>
            <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition-colors">
              Delete Question
            </button>
          </div>
        </div>
      </div>
    </DashboardPageCompement>
  )
}
