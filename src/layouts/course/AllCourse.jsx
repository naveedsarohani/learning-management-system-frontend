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
import ActionButton from "../../components/global/ActionButton"

export default function AllCourses() {
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [courses, setCourses] = useState([blueprint.course])
  const { destroy } = useDelete()

  useEffect(() => {
    course.all(token, setCourses, handler, { user_id: user.id })
  }, [handler.navigate, user])

  return handler.componentLoaded && <DashboardPageCompement title={"all courses"}>
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
          {/* <th>Poster</th> */}
          <th>Action</th>
        </>
      }
      tds={
        !isNullOrEmpty(courses) &&
        courses.map((course, index) => (
          <tr key={course.id}>
            <td className="p-5">{index + 1}</td>
            <td className="flex items-center pt-1 gap-2">
              <td>
                <img
                  src={readFile(course.image)}
                  alt="poster"
                  className="rounded-full w-10 h-10 border-blue-400 border-[1px]"
                />
              </td>
              {course.title.substring(0, 10)}...
            </td>
            <td>{course.description.substring(0, 30)}...</td>
            <td>{formatDate(course.created_at)}</td>

            <td className="flex  gap-2 pt-2">
              <ActionButton route={`./${course.id}`} name={"View"} />
              <ActionButton
                route={`./edit/${course.id}`}
                name={"Edit"}
                color="bg-gradient-to-r from-[#ffcc00] to-[#f57f17]"
              />
              <ActionButton
                name={"Delete"}
                onClick={() =>
                  destroy("/courses", course.id, course.title + " course")
                }
                color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
              />
            </td>
          </tr>
        ))
      }
    />
  </DashboardPageCompement>
}
