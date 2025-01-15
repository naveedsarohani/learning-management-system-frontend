import { useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import examapi from "../../uitils/api/exam"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import {
  capitalize,
  formatDate,
  isNullOrEmpty,
} from "../../uitils/functions/global"
import ActionButton from "../../components/global/ActionButton"
import Accordion from "../../components/accordion/Accordion"
import AccordionContent from "../../components/accordion/AccordionContent"
import { populateOptions } from "../question/ShowQuestion"
import examQuestion from "../../uitils/api/exam_question"
import { useDelete } from "../../contexts/Delete"
import NoContent from "../../components/global/NoContent"

export default function ShowExam() {
  const { examId } = useParams()
  const { destroy } = useDelete();
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [exam, setExam] = useState(blueprint.exam)
  const [currentQuesionId, setCurrentQuesionId] = useState(null)
  const [questions, setQuestions] = useState([blueprint.examQuestion])

  useEffect(() => {
    examapi.show(examId, token, setExam, handler)
    examQuestion.all(token, setQuestions, handler, { exam_id: examId })
  }, [examId])

  return handler.componentLoaded && <DashboardPageCompement title={"specified exam"}>
    <ActionButton name={"Add a new question"} route={"./add-question"} />

    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {capitalize(exam.title)}
          </h1>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Time Limit:</strong> {exam.time_allowed}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Total Retakes:</strong> {exam.total_retakes}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <strong>Passing Percentage:</strong> {exam.passing_percentage}%
          </p>
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> {formatDate(exam.updated_at)}
          </p>

          <div className="action">
            <ActionButton
              route={`./edit-question/${exam.id}`}
              name={"Edit"}
              color="bg-gradient-to-r from-[#ffcc00] to-[#f57f17]"
            />
            <ActionButton
              name={"Delete"}
              onClick={() => destroy("/exams", exam.id, "exam", -1)}
              color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
            />
          </div>
        </div>

        <Accordion title="All Questions" className="p-6">
          {!isNullOrEmpty(questions) ? questions.map(question => (
              <AccordionContent
                key={question.id}
                tabTitle={question.question_text.slice(0, 50)}
                itemId={question.id}
                currentTab={{
                  value: currentQuesionId,
                  set: setCurrentQuesionId,
                }}
                identity="question"
                noEdit={true}
                className="mb-4 border rounded shadow-md overflow-hidden"
                del={setQuestions}
              >
                <div className="p-4 bg-gray-100 border-b">
                  <h1 className="text-xl font-semibold text-gray-800">
                    {capitalize(question.question_text)}
                  </h1>
                  <p className="text-sm text-gray-600">
                    <strong>Caryy Marks: </strong>
                    {parseFloat(question.carry_marks)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Added At:</strong>{" "}
                    {formatDate(question.created_at)}
                  </p>
                </div>

                {/* options */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Options
                  </h2>
                  <ul className="list-none text-gray-700">
                    {question.answers.D ? (
                      populateOptions(question.answers, false)
                    ) : (
                      <li>{question.answers}</li>
                    )}
                    <li className="text-green-600 font-medium">
                      Correct Option: {question.correct_option}
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            )): <NoContent message="There are no questions added to this exam yet." />}
        </Accordion>
      </div>
    </div>
  </DashboardPageCompement>
}
