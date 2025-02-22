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
import NoContent from "../../components/global/NoContent"
import { role } from "../../uitils/functions/constants"

export default function AllExam() {
  const { destroy } = useDelete()
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [exams, setExams] = useState([blueprint.exam])

  useEffect(() => {
    exam.all(
      token,
      setExams,
      handler,
      user.role !== role.ADMIN && { instructor_id: user.id }
    )
  }, [handler.navigate, user])

  return (
    handler.componentLoaded && (
      <DashboardPageCompement title={"all exams"}>
        <ActionButton name={"add exam"} route={"./add"} />

        {!isNullOrEmpty(exams) ? (
          <Table
            ths={
              <>
                <th className="py-3 px-4">Sno.</th>
                <th>Conductor</th>
                <th>Title</th>
                <th>Description</th>
                <th>Time Limit</th>
                <th>Passing Percentage</th>
                <th>Starts At</th>
                <th>Created On</th>
                <th>Action</th>
              </>
            }
            tds={exams.map((exam, index) => (
              <>
                <tr key={exam.id} className="text-nowrap text-center">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td>{exam.instructor.name}</td>
                  <td>
                    <Link
                      className="hover:text-blue-500 hover:underline"
                      to={`./${exam.id}`}
                    >
                      {exam.title.substring(0, 30)}
                    </Link>
                  </td>
                  <td>{exam.description.substring(0, 50)}</td>
                  <td>{exam.time_allowed}mins</td>
                  <td>{exam.passing_percentage}%</td>
                  <td>{formatDate(exam.starts_at, true)}</td>
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
                      onClick={() =>
                        destroy("/exams", exam.id, "exam", setExams)
                      }
                      color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
                    />
                  </td>
                </tr>
              </>
            ))}
          />
        ) : (
          <NoContent message="No exams found. Please try adding some." />
        )}
      </DashboardPageCompement>
    )
  )
}
