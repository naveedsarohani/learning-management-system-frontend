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
import { useHandler } from "../../contexts/Handler"
import NoContent from "../../components/global/NoContent"
import { role as userRole } from "../../uitils/functions/constants"
import enrollment from "../../uitils/api/enrollment"

export default function Users({ role }) {
  const {
    credentials: { user, token },
  } = useAuth()
  const { handler } = useHandler()
  const [instructors, setInstructors] = useState([blueprint.user])
  const { destroy } = useDelete()

  useEffect(() => {
    user.role === userRole.ADMIN &&
      auth.users(token, setInstructors, handler, { role })
    user.role === userRole.INSTRUCTOR &&
      role == userRole.STUDENT &&
      enrollment.all(token, setInstructors, handler, {
        "course.user_id": user.id,
        getOnlyProperty: "student",
      })
  }, [role])

  return (
    handler.componentLoaded && (
      <DashboardPageCompement title={`all ${role}`}>
        {!isNullOrEmpty(instructors) ? (
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
                <tr key={instructor.id} className="text-nowrap">
                  <td>{index + 1}</td>
                  <td className="flex items-center pt-1 gap-2">
                    <span>
                      <img
                        src={readFile(instructor.image)}
                        alt="display picture"
                        className="rounded-full w-10 h-10 border-blue-400 border-[1px]"
                      />
                    </span>
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
                          capEach(instructor.name),
                          setInstructors
                        )
                      }
                    />
                  </td>
                </tr>
              ))
            }
          />
        ) : (
          <NoContent message={`No ${role}s found`} />
        )}
      </DashboardPageCompement>
    )
  )
}
