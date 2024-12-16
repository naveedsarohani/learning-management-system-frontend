import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import course from "../../uitils/api/course"
import { Link } from "react-router-dom"
import { useDelete } from "../../contexts/Delete"
import blueprint from "../../uitils/blueprint"
import {
  formatDate,
  isNullOrEmpty,
  readFile,
} from "../../uitils/functions/global"

export default function AllCourses() {
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [courses, setCourses] = useState([blueprint.course])
  const { destroy } = useDelete()

  useEffect(() => {
    course.all(token, setCourses, handler)
  }, [handler.navigate, user])

  return (
    <DashboardPageCompement title={"all courses"}>
      <Link to={"./add"}>
        <button className=" relative -top-6 left-[60%] sm:left-[82%]  bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white py-2 px-4 rounded-lg ">
          Add a new course
        </button>
      </Link>

      {/* <h1>The all courses are below in a table form</h1> */}
      <Table
        ths={
          <>
            <th className="py-3 px-4">Sno.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created On</th>
            <th>Poster</th>
            <th>Action</th>
          </>
        }
        tds={
          !isNullOrEmpty(courses) &&
          courses.map((course, index) => (
            <tr key={course.id}>
              <td className="p-5">{index + 1}</td>
              <td>{course.title}</td>
              <td>{course.description.substring(0, 30)}...</td>
              <td>{formatDate(course.created_at)}</td>
              <td>
                <img src={readFile(course.image)} alt="poter" width={50} />
              </td>
              <td>
                <Link to={"./" + course.id}>View</Link>
                <Link to={"./edit/" + course.id}>Edit</Link>
                <button
                  onClick={() =>
                    destroy("/courses", course.id, course.title + " course")
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
