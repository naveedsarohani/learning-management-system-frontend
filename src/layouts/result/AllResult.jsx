import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import blueprint from "../../uitils/blueprint"
import {
  capEach,
  capitalize,
  formatDate,
  isNullOrEmpty,
} from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import result from "../../uitils/api/exam_submission"
import ActionButton from "../../components/global/ActionButton"
import { Link } from "react-router-dom"
import NoContent from "../../components/global/NoContent"
import { role } from "../../uitils/functions/constants"

export function isPass({
  obtained_marks,
  total_marks,
  exam: { passing_percentage },
}) {
  const percentage =
    (parseFloat(obtained_marks) / parseFloat(total_marks)) * 100
  return parseFloat(passing_percentage) <= percentage
}

export default function AllResult() {
  const { destroy } = useDelete()
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [results, setResults] = useState([blueprint.examSubmission])

  useEffect(() => {
    result.all(
      token,
      setResults,
      handler,
      user.role !== role.ADMIN && { "exam.instructor_id": user.id }
    )
  }, [handler.navigate, user])

  return (
    handler.componentLoaded && (
      <DashboardPageCompement title={"all results"}>
        {!isNullOrEmpty(results) ? (
          <Table
            ths={
              <>
                <th>Sno.</th>
                <th>Student</th>
                <th>Exam/Test</th>
                <th>Conducted By</th>
                <th>Total Questions</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Total Correct Answers</th>
                <th>Total Wrong Answers</th>
                <th>Status</th>
                <th>Submitted At</th>
                <th>Action</th>
              </>
            }
            tds={
              !isNullOrEmpty(results) &&
              results.map((result, index) => (
                <tr key={result.id}>
                  <td>{index + 1}</td>
                  <td className="text-nowrap">
                    {capEach(result.student.name)}
                  </td>
                  <td className="text-nowrap">
                    <Link
                      className="hover:text-blue-500 hover:underline"
                      to={`/dashboard/exams/${result.exam.id}`}
                    >
                      {capitalize(result.exam.title)}
                    </Link>
                  </td>
                  <td className="text-nowrap">
                    {capEach(result.exam.instructor.name)}
                  </td>
                  <td className="text-nowrap">{result.total_questions}</td>
                  <td className="text-nowrap">{result.total_marks}</td>
                  <td className="text-nowrap">{result.obtained_marks}</td>
                  <td className="text-nowrap">{result.total_correct}</td>
                  <td className="text-nowrap">{result.total_wrong}</td>
                  <td className="text-nowrap">
                    {isPass(result) ? "Pass" : "Fail"}
                  </td>
                  <td className="text-nowrap">
                    {formatDate(result.created_at)}
                  </td>
                  <td className="flex gap-2 pt-2 text-nowrap">
                    <ActionButton route={`./${result.id}`} name={"View"} />
                    <ActionButton
                      name={"Delete"}
                      onClick={() =>
                        destroy("/results", result.id, "result", setResults)
                      }
                      color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
                    />
                  </td>
                </tr>
              ))
            }
          />
        ) : (
          <NoContent message="No exam results found." />
        )}
      </DashboardPageCompement>
    )
  )
}
