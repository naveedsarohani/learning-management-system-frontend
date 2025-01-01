import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { capEach, capitalize, formatDate, isNullOrEmpty } from "../../uitils/functions/global"
import resultapi from "../../uitils/api/exam_submission"
import ActionButton from "../../components/global/ActionButton"
import { useDelete } from "../../contexts/Delete"
import BlankResultCard from "../blank_cards/BlankResultCard"

export default function ShowResult() {
  const { resultId } = useParams()
  const { credentials: { token } } = useAuth()
  const { handler } = useHandler()
  const [result, setresult] = useState(blueprint.examSubmission)
  const { destroy } = useDelete()

  useEffect(() => {
    resultapi.show(resultId, token, setresult, handler)
  }, [resultId])

  switch (isNullOrEmpty(result.id)) {
    case true: return <BlankResultCard />
    case false: return <DashboardPageCompement title={"specified result"} >
      <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Student:{" "}
            <span className="text-blue-600">{capEach(result.student.name)}</span>
          </h1>
          <h2 className="text-2xl font-medium text-gray-700 mt-2">
            Exams/Test:{" "}
            <span className="text-gray-900">{capitalize(result.exam.title)}</span>
          </h2>
          <h2 className="text-2xl font-medium text-gray-700 mt-2">
            Conducted By:{" "}
            <span className="text-gray-900">{capEach(result.exam.instructor.name)}</span>
          </h2>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-lg text-gray-600">
            Obtained Marks: <span className="font-semibold text-gray-800">{result.obtained_marks}</span>
          </p>

          <p className="text-lg text-gray-600">
            Total Retakes: <span className="font-semibold text-gray-800">{result.retakes_count}</span>
          </p>

          <p className="text-lg text-gray-600">
            Result Status: <span className="font-semibold text-gray-800">{result.is_passed ? 'Pass' : 'Fail'}</span>
          </p>

          <p className="text-lg text-gray-600">
            Attempted On: <span className="font-semibold text-gray-900">{formatDate(result.created_at)}</span>
          </p>
        </div>

        <div className="mt-6">
          <ActionButton
            name="Delete"
            onClick={() => destroy("/exam-submissions", result.id, "result")}
            color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f] hover:from-[#ff3b2f] hover:to-[#c62828]"
          />
        </div>
      </div>
    </DashboardPageCompement >
  }
}


