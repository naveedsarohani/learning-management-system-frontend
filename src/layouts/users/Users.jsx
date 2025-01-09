import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import blueprint from "../../uitils/blueprint"
import auth from "../../uitils/api/auth"
import { useAuth } from "../../contexts/Authentication"
import { formatDate, isNullOrEmpty, readFile } from "../../uitils/functions/global"
import ActionButton from "../../components/global/ActionButton"
import { useDelete } from "../../contexts/Delete"
import { useHandler } from "../../contexts/Handler"

export default function Users({ role }) {
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler();
  const [instructors, setInstructors] = useState([blueprint.user])
  const { destroy } = useDelete()

  useEffect(() => {
    auth.users(token, setInstructors, handler, { role })
  }, [role])

  return handler.componentLoaded && <DashboardPageCompement title={`all ${role}`}>
    <Table
      ths={
        <>
          <td>Sno.</td>
          <td>Name</td>
          <td>Email</td>
          <td>Role</td>
          <td>Registered At</td>
          <td>Actions</td>
        </>
      }
      tds={
        !isNullOrEmpty(instructors) &&
        instructors.map((instructor, index) => (
          <tr key={instructor.id}>
            <td>{index + 1}</td>
            <td className="flex items-center pt-1 gap-2">
              <td>
                <img
                  src={readFile(instructor.image)}
                  alt="display picture"
                  className="rounded-full w-10 h-10 border-blue-400 border-[1px]"
                />
              </td>
              {instructor.name}
            </td>
            <td>{instructor.email}</td>
            <td>{instructor.role}</td>
            <td>{formatDate(instructor.created_at)}</td>
            <td>
              <ActionButton
                name={"Delete"}
                color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
                onClick={() =>
                  destroy(
                    "/auth/delete",
                    instructor.id,
                    instructor.name + " " + instructor.role
                  )
                }
              />
            </td>
          </tr>
        ))
      }
    />
  </DashboardPageCompement>
}