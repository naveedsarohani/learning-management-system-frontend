import { useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import questionapi from "../../uitils/api/exam_question"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import {
  capitalize,
  formatDate,
  isNullOrEmpty,
} from "../../uitils/functions/global"
import { populateOptions } from "../question/ShowQuestion"

export default function ShowQuestion() {
  const { questionId } = useParams()
  const { credentials: { token } } = useAuth()
  const { handler } = useHandler()
  const [question, setQuestion] = useState(blueprint.examQuestion)

  useEffect(() => {
    questionapi.show(questionId, token, setQuestion, handler)
  }, [questionId])

  return handler.componentLoaded && <DashboardPageCompement title={"specified exam question"}>
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">{`Exam: ${capitalize(question.exam.title)}`}</h1>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-medium text-gray-700">
          {capitalize(question.question_text)}
        </h2>
        <p className="text-lg text-gray-600 mt-1">
          Carry Marks:{" "}
          <span className="font-medium">
            {(question.carry_marks)}
          </span>
        </p>
        <p className="text-lg text-gray-600 mt-1">
          Created on:{" "}
          <span className="font-medium">
            {formatDate(question.created_at)}
          </span>
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Options</h3>

        {!isNullOrEmpty(question.answers) && question.answers.D && <div className="mt-4 space-y-2">
          {populateOptions(question.answers)}
          <p className="text-green-500">
            The correct option is:{" "}
            <span className="font-semibold">{question.correct_option}</span>
          </p>
        </div>}

        {!isNullOrEmpty(question.answers) && !question.answers.D && <div className="mt-4 space-y-2">
          <p className="text-gray-700">This is a true or false question</p>
          <p className="text-gray-700">
            The correct option is:{" "}
            <span className="font-semibold text-blue-600">
              {question.correct_option}
            </span>
          </p>
        </div>}
      </div>
    </div>
  </DashboardPageCompement>
}
