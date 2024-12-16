import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import course from "../../uitils/api/course"
import { Link } from "react-router-dom"
import { useDelete } from "../../contexts/Delete"
import blueprint from "../../uitils/blueprint"
import { capEach } from "../../uitils/functions/global"
import ActionButton from "../../components/global/ActionButton"

export default function AllCourses() {
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [courses, setCourses] = useState([blueprint.course])
  const { destory } = useDelete()

  useEffect(() => {
    course.all(token, setCourses, handler)
  }, [handler.navigate, user])

  return (
    <DashboardPageCompement title={"all courses"}>
      <Link to={"./add"}>
        <button className=" bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white py-2 px-4 rounded-lg ">
          Add a new course
        </button>
      </Link>

      <h1 className="text-center"> All Courses Table </h1>
      <Table
        ths={
          <>
            <th>Sno.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created On</th>
            <th>Action</th>
          </>
        }
        tds={
          courses.at(0).id &&
          courses.map((course, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.created_at}</td>
              <td>
                <ActionButton name={"View"} route={"./" + course.id} />
                <button
                  onClick={() =>
                    destory(
                      "/courses",
                      course.id,
                      capEach(course.title + " course")
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        }
      />
    </DashboardPageCompement>
  )
}
