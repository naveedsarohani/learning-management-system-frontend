import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { formatDate } from "../../uitils/functions/global"
import submissionapi from "../../uitils/api/submission"
import ActionButton from "../../components/global/ActionButton"
import { useDelete } from "../../contexts/Delete"

export default function ShowSubmission() {
  const { submissionId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [submission, setsubmission] = useState(blueprint.submission)
  const { destroy } = useDelete()

  useEffect(() => {
    submissionapi.show(submissionId, token, setsubmission, handler)
  }, [submissionId])

  return handler.componentLoaded && <DashboardPageCompement title={"specified submission"}>
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Student:{" "}
          <span className="text-blue-600">{submission.student.name}</span>
        </h1>
        <h2 className="text-2xl font-medium text-gray-700 mt-2">
          Assessment:{" "}
          <span className="text-gray-900">{submission.assessment.title}</span>
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-lg text-gray-600">
          Score:{" "}
          <span className="font-semibold text-green-600">
            {submission.score}
          </span>
        </p>
        <p className="text-lg text-gray-600">
          Total Retakes:{" "}
          <span className="font-semibold text-gray-800">
            {submission.retake_count}
          </span>
        </p>
        <p className="text-lg text-gray-600">
          Submitted on:{" "}
          <span className="font-semibold text-gray-900">
            {formatDate(submission.submitted_at)}
          </span>
        </p>
      </div>

      <div className="mt-6">
        <ActionButton
          name="Delete"
          onClick={() => destroy("/submissions", submission.id, "submission", -1)}
          color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f] hover:from-[#ff3b2f] hover:to-[#c62828]"
        />
      </div>
    </div>
  </DashboardPageCompement>
}
