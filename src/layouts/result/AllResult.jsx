import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import blueprint from "../../uitils/blueprint"
import { capEach, capitalize, formatDate, isNullOrEmpty } from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import result from "../../uitils/api/exam_submission"
import ActionButton from "../../components/global/ActionButton"
import { Link } from "react-router-dom"

export default function AllResult() {
  const { destroy } = useDelete()
  const { handler } = useHandler()
  const { credentials: { user, token } } = useAuth()
  const [results, setResults] = useState([blueprint.examSubmission])

  useEffect(() => {
    result.all(token, setResults, handler)
  }, [handler.navigate, user])

  return (
    <DashboardPageCompement title={"all results"}>
      <h1>The all results of conducted exams</h1>
      <Table
        ths={
          <>
            <th>Sno.</th>
            <th>Student</th>
            <th>Exam/Test</th>
            <th>Conducted By</th>
            <th>Obtained Marks</th>
            <th>Retakes</th>
            <th>Status</th>
            <th>Submitted At</th>
            <th>Action</th>
          </>
        }
        tds={!isNullOrEmpty(results) && results.map((result, index) => <tr key={result.id}>
          <td>{index + 1}</td>
          <td>{capEach(result.student.name)}</td>
          <td>
            <Link className="hover:text-blue-500" to={`/dashboard/exams/${result.exam.id}`}>{capitalize(result.exam.title)}</Link>
          </td>
          <td>{capEach(result.exam.instructor.name)}</td>
          <td>{result.obtained_marks}</td>
          <td>{result.retakes_count}</td>
          <td>{result.is_passed ? 'Pass' : 'Fail'}</td>
          <td>{formatDate(result.created_at)}</td>
          <td className="flex gap-2 pt-2">
            <ActionButton route={`./${result.id}`} name={"View"} />
            <ActionButton
              name={"Delete"}
              onClick={() => destroy("/results", result.id, "result")}
              color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
            />
          </td>
        </tr>)}
      />
    </DashboardPageCompement>
  )
}
