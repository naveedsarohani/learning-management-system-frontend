import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import { Link } from "react-router-dom"
import blueprint from "../../uitils/blueprint"
import { formatDate, isNullOrEmpty } from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import assessment from "../../uitils/api/assessment"
import ActionButton from "../../components/global/ActionButton"
import { role } from "../../uitils/functions/constants"
import NoContent from "../../components/global/NoContent"

export default function Allassessment() {
  const { destroy } = useDelete()
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [assessments, setAssessments] = useState([blueprint.assessment])

  useEffect(() => {
    assessment.all(
      token,
      setAssessments,
      handler,
      user.role !== role.ADMIN && { "course.user_id": user.id }
    )
  }, [handler.navigate, user])

  return (
    handler.componentLoaded && (
      <DashboardPageCompement title={"all assessments"}>
        {!isNullOrEmpty(assessments) ? (
          <Table
            ths={
              <>
                <th className="py-3 px-4">Sno.</th>
                <th>Course</th>
                <th>Title</th>
                <th>Type</th>
                <th>Time Limit</th>
                <th>Tetakes Allowed</th>
                <th>Unlocks At</th>
                <th>Created On</th>
                <th>Action</th>
              </>
            }
            tds={
              !isNullOrEmpty(assessments) &&
              assessments.map((assessment, index) => (
                <tr key={assessment.id} className="text-nowrap">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td>{assessment.course.title.slice(0, 10) + "..."}</td>
                  <td>{assessment.title.slice(0, 10) + "..."}</td>
                  <td>{assessment.type}</td>
                  <td>{assessment.time_limit}</td>
                  <td>{assessment.retakes_allowed}</td>
                  <td>{assessment.unlocks_at}%</td>
                  <td>{formatDate(assessment.created_at)}</td>
                  <td className="flex gap-2">
                    <ActionButton route={`./${assessment.id}`} name={"View"} />
                    <ActionButton
                      route={`./edit/${assessment.id}`}
                      name={"Edit"}
                      color="bg-gradient-to-r from-[#ffcc00] to-[#f57f17]"
                    />
                    <ActionButton
                      name={"Delete"}
                      onClick={() =>
                        destroy(
                          "/assessments",
                          assessment.id,
                          "assessment",
                          setAssessments
                        )
                      }
                      color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
                    />
                  </td>
                </tr>
              ))
            }
          />
        ) : (
          <NoContent message="No assessment found, Please try adding some." />
        )}
      </DashboardPageCompement>
    )
  )
}
