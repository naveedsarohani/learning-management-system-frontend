import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import blueprint from "../../uitils/blueprint"
import { formatDate, isNullOrEmpty } from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import submission from "../../uitils/api/submission"
import ActionButton from "../../components/global/ActionButton"
import NoContent from "../../components/global/NoContent"
import { role } from "../../uitils/functions/constants"

export default function AllSubmission() {
  const { destroy } = useDelete()
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [submissions, setSubmissions] = useState([blueprint.submission])

  useEffect(() => {
    submission.all(token, setSubmissions, handler, user.role !== role.ADMIN && { 'assessment.course.user_id': user.id })
  }, [handler.navigate, user])


  return handler.componentLoaded && <DashboardPageCompement title={"all submissions"}>
    {!isNullOrEmpty(submissions) ? <Table
      ths={
        <>
          <th>Sno.</th>
          <th>Student</th>
          <th>Assessment</th>
          <th>Score</th>
          <th>Retakes</th>
          <th>Submitted At</th>
          <th>Action</th>
        </>
      }
      tds={
        !isNullOrEmpty(submissions) &&
        submissions.map((submission, index) => (
          <tr key={submission.id}>
            <td>{index + 1}</td>
            <td>{submission.student.name}</td>
            <td>{submission.assessment.title}</td>
            <td>{submission.score}</td>
            <td>{submission.retake_count}</td>
            <td>{formatDate(submission.submitted_at)}</td>
            <td className="flex gap-2 pt-2">
              <ActionButton route={`./${submission.id}`} name={"View"} />
              <ActionButton
                name={"Delete"}
                onClick={() =>
                  destroy("/submissions", submission.id, "submission", setSubmissions)
                }
                color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
              />
            </td>
          </tr>
        ))
      }
    /> : <NoContent message="No assessment submissions found." />}
  </DashboardPageCompement>
}
