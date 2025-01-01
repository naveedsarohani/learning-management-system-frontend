import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import { Link } from "react-router-dom"
import blueprint from "../../uitils/blueprint"
import { formatDate, isNullOrEmpty } from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import exam from "../../uitils/api/exam"
import ActionButton from "../../components/global/ActionButton"
import BlankTable from "../blank_cards/BlankTable"

export default function AllExam() {
  const { destroy } = useDelete()
  const { handler } = useHandler()
  const { credentials: { user, token } } = useAuth()
  const [exams, setExams] = useState([blueprint.exam])

  useEffect(() => {
    exam.all(token, setExams, handler)
  }, [handler.navigate, user])

  return (
    <DashboardPageCompement title={"all exams"}>
      <ActionButton name={'add exam'} route={'./add'} />

      {isNullOrEmpty(exams) ? <BlankTable /> : <Table
        ths={
          <>
            <th className="py-3 px-4">Sno.</th>
            <th>Conductor</th>
            <th>Title</th>
            <th>Description</th>
            <th>Time Limit</th>
            <th>Tetakes Allowed</th>
            <th>Passing Percentage</th>
            <th>Created On</th>
            <th>Action</th>
          </>
        }
        tds={
          !isNullOrEmpty(exams) && exams.map((exam, index) => (
            <tr key={exam.id}>
              <td className="py-3 px-4">{index + 1}</td>
              <td>{exam.instructor.name}</td>
              <td>{exam.title}</td>
              <td>{exam.description}</td>
              <td>{exam.time_allowed}</td>
              <td>{exam.total_retakes}</td>
              <td>{exam.passing_percentage}%</td>
              <td>{formatDate(exam.created_at)}</td>
              <td className="flex gap-2">
                <ActionButton route={`./${exam.id}`} name={"View"} />
                <ActionButton
                  route={`./edit/${exam.id}`}
                  name={"Edit"}
                  color="bg-gradient-to-r from-[#ffcc00] to-[#f57f17]"
                />
                <ActionButton
                  name={"Delete"}
                  onClick={() => destroy("/exams", exam.id, "exam")}
                  color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
                />
              </td>
            </tr>
          ))
        }
      />}
    </DashboardPageCompement>
  )
}
