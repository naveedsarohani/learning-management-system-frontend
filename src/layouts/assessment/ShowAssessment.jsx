import { Link, useParams } from "react-router-dom"
import DashboardPageCompement from "../../components/global/DashboardPage"
import { useEffect, useState } from "react"
import blueprint from "../../uitils/blueprint"
import assessmentapi from "../../uitils/api/assessment"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { formatDate } from "../../uitils/functions/global"

export default function ShowAssessment() {
  const { assessmentId } = useParams()
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const [assessment, setAssessment] = useState(blueprint.assessment)

  useEffect(() => {
    assessmentapi.show(assessmentId, token, setAssessment, handler)
  }, [assessmentId])

  return (
    <DashboardPageCompement title={"specified assessment"}>
      <Link to={"./add-assessment"}>Add a new assessment</Link>

      <div className=" flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent mb-4">
            {assessment.title}
          </h1>

          <div className="text-gray-700 space-y-4">
            <div className="flex items-center">
              <span className="font-semibold mr-2">Type:</span>
              <p className="text-lg">{assessment.type}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Time Limit:</span>
              <p className="text-lg">{assessment.time_limit} minutes</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Retakes Allowed:</span>
              <p className="text-lg">{assessment.retakes_allowed}</p>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Last Updated:</span>
              <p className="text-lg">{formatDate(assessment.updated_at)}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white font-semibold rounded-md shadow hover:opacity-90 transition-opacity">
              Edit Assessments
            </button>
            <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition-colors">
              Delete Assessments
            </button>
          </div>
        </div>
      </div>
    </DashboardPageCompement>
  )
}
