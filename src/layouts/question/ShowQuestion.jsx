import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import questionapi from "../../uitils/api/question"
import answerapi from "../../uitils/api/answer"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import {
  capitalize,
  formatDate,
  isNullOrEmpty,
} from "../../uitils/functions/global"

export function populateOptions(data) {
  return Object.entries(JSON.parse(data)).map(([key, value], index) => (
    <li key={index}>
      {key}: {capitalize(value)}
    </li>
  ))
}

export default function ShowQuestion() {
  const { questionId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [question, setQuestion] = useState(blueprint.question)
  const [answer, setAnswer] = useState(blueprint.answer)

  useEffect(() => {
    questionapi.show(questionId, token, setQuestion, handler)
    answerapi.all(token, setAnswer, handler, { question_id: questionId })
  }, [questionId])

  return (
    <DashboardPageCompement title={"specified question"}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">{`Assessment: ${capitalize(
            question.assessment.title
          )}`}</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-medium text-gray-700">
            {capitalize(question.question_text)}
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Type: <span className="font-medium">{question.type}</span>
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

          {!isNullOrEmpty(answer) && answer.question.type === "MCQ" && (
            <div className="mt-4 space-y-2">
              {populateOptions(answer.answer_text)}
              <p className="text-green-500">
                The correct option is:{" "}
                <span className="font-semibold">{answer.is_correct}</span>
              </p>
            </div>
          )}

          {!isNullOrEmpty(answer) && answer.question.type === "true/false" && (
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">This is a true or false question</p>
              <p className="text-gray-700">
                The correct option is:{" "}
                <span className="font-semibold text-blue-600">
                  {answer.is_correct}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardPageCompement>
  )
}
