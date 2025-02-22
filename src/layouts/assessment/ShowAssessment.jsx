import { useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import assessmentapi from "../../uitils/api/assessment"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import {
  capitalize,
  formatDate,
  isNullOrEmpty,
  where,
} from "../../uitils/functions/global"
import ActionButton from "../../components/global/ActionButton"
import question from "../../uitils/api/question"
import Accordion from "../../components/accordion/Accordion"
import AccordionContent from "../../components/accordion/AccordionContent"
import answer from "../../uitils/api/answer"
import { populateOptions } from "../question/ShowQuestion"
import NoContent from "../../components/global/NoContent"
import { useDelete } from "../../contexts/Delete"

export default function ShowAssessment() {
  const { assessmentId } = useParams()
  const { destroy } = useDelete()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [assessment, setAssessment] = useState(blueprint.assessment)
  const [questions, setQuestions] = useState([blueprint.question])
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [answers, setAnswers] = useState([blueprint.answer])

  useEffect(() => {
    assessmentapi.show(assessmentId, token, setAssessment, handler)
    question.all(token, setQuestions, handler, { assessment_id: assessmentId })
    answer.all(token, setAnswers, handler)
  }, [assessmentId])

  function getQuestionAnswer(answers, questionId) {
    return where(answers, { question_id: questionId })[0]
  }

  return (
    handler.componentLoaded && (
      <DashboardPageCompement title={"specified assessment"}>
        <ActionButton name={"Add a new question"} route={"./add-question"} />

        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Assessment Details */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {capitalize(assessment.title)}
              </h1>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Type:</strong> {assessment.type}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Time Limit:</strong> {assessment.time_limit}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Retakes Allowed:</strong> {assessment.retakes_allowed}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Unlocks At:</strong> {assessment.unlocks_at}%
              </p>
              <p className="text-sm text-gray-600">
                <strong>Last Updated:</strong>{" "}
                {formatDate(assessment.updated_at)}
              </p>

              <div className="action mt-5 ">
                <ActionButton
                  route={`/dashboard/assessments/edit/${assessment.id}`}
                  name={"Edit"}
                  color="bg-gradient-to-r from-[#ffcc00] to-[#f57f17] mr-2"
                />
                <ActionButton
                  name={"Delete"}
                  onClick={() =>
                    destroy("/assessments", assessment.id, "assessment", -1)
                  }
                  color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
                />
              </div>
            </div>

            {/* Questions Accordion */}
            <Accordion title="All Questions" className="p-6">
              {!isNullOrEmpty(questions) ? (
                questions.map((question) => (
                  <AccordionContent
                    key={question.id}
                    tabTitle={question.question_text}
                    itemId={question.id}
                    identity="question"
                    noEdit={true}
                    noView={true}
                    currentTab={{
                      value: currentQuestionId,
                      set: setCurrentQuestionId,
                    }}
                    className="mb-4 border rounded shadow-md overflow-hidden"
                    del={setQuestions}
                  >
                    <div className="p-4 bg-gray-100 border-b">
                      <h1 className="text-xl font-semibold text-gray-800">
                        {capitalize(question.question_text)}
                      </h1>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Type:</strong> {question.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Added At:</strong>{" "}
                        {formatDate(question.created_at)}
                      </p>
                    </div>

                    {/* Options Section */}
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Options
                      </h2>
                      {(() => {
                        const currentAnswer = getQuestionAnswer(
                          answers,
                          question.id
                        )
                        if (!isNullOrEmpty(currentAnswer)) {
                          return currentAnswer.question.type === "MCQ" ? (
                            <ul className="list-none text-gray-700">
                              {populateOptions(
                                currentAnswer.answer_text,
                                false
                              )}
                              <li className="text-green-600 font-medium">
                                The correct option is:{" "}
                                {currentAnswer.is_correct}
                              </li>
                            </ul>
                          ) : (
                            <ul className="list-none text-gray-700">
                              <li>
                                This is a True or False optional question.
                              </li>
                              <li className="text-green-600 font-medium">
                                The correct option is:{" "}
                                {currentAnswer.is_correct}
                              </li>
                            </ul>
                          )
                        }
                      })()}
                    </div>
                  </AccordionContent>
                ))
              ) : (
                <NoContent message="no questions have been added to this assessment" />
              )}
            </Accordion>
          </div>
        </div>
      </DashboardPageCompement>
    )
  )
}
