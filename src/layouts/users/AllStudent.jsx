import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import blueprint from "../../uitils/blueprint"
import auth from "../../uitils/api/auth"
import { useAuth } from "../../contexts/Authentication"
import {
  capEach,
  formatDate,
  isNullOrEmpty,
  readFile,
} from "../../uitils/functions/global"
import ActionButton from "../../components/global/ActionButton"
import { useDelete } from "../../contexts/Delete"

export default function Allstudent() {
  const {
    credentials: { token },
  } = useAuth()
  const [students, setStudents] = useState([blueprint.user])
  const { destroy } = useDelete()

  useEffect(() => {
    auth.users(token, setStudents, { role: "student" })
  }, [])

  console.log(students)
  return (
    <DashboardPageCompement title={"all students"}>
      <Table
        ths={
          <>
            <td>Sno.</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            {/* <td>Display Picture</td> */}
            <td>Registered At</td>
            <td>Actions</td>
          </>
        }
        tds={
          !isNullOrEmpty(students) &&
          students.map((student, index) => (
            <tr key={student.id} className="text-center">
              <td>{index + 1}</td>
              <td className="flex items-center pt-1 gap-2">
                <td>
                  <img
                    src={readFile(student.image)}
                    alt="display picture"
                    className="rounded-full w-10 h-10 border-blue-400 border-[1px]"
                  />
                </td>
                {student.name}
              </td>
              <td>{student.email}</td>
              <td>{student.role}</td>

              <td>{formatDate(student.created_at)}</td>
              <td>
                <ActionButton
                  name={"Delete"}
                  color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
                  onClick={() =>
                    destroy(
                      "/auth/delete",
                      student.id,
                      student.name + " " + student.role
                    )
                  }
                />
              </td>
            </tr>
          ))
        }
      />
    </DashboardPageCompement>
  )
}
