import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import assessment from "../../uitils/api/assessment"
import blueprint from "../../uitils/blueprint"
import AssessmentCard from "../../components/global/AssessmentCard"
import { isNullOrEmpty } from "../../uitils/functions/global"
import NoContent from "../../components/global/NoContent"

export default function MyAssessments() {
  const {
    credentials: { user, token },
  } = useAuth()
  const [assessments, setAssessments] = useState([blueprint.assessment])
  const { handler } = useHandler()

  useEffect(() => {
    assessment.all(token, setAssessments, handler)
  }, [location.pathname, user])

  return (
    <div className=" py-6 bg-gray-50 min-h-screen px-14">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Assessments</h1>
      {!isNullOrEmpty(assessments[0].id) ? (
        <div className="flex justify-start flex-wrap gap-6">
          {assessments.map((assessment) => (
            <AssessmentCard assessment={assessment} key={assessment.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 bg-white shadow rounded-lg">
          <NoContent message="There is not any course assessment for you" />
        </div>
      )}
    </div>
  )
}
