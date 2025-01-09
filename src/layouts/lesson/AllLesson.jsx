import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Table from "../../components/global/Table"
import { useHandler } from "../../contexts/Handler"
import { useAuth } from "../../contexts/Authentication"
import lesson from "../../uitils/api/lesson"
import { Link } from "react-router-dom"
import blueprint from "../../uitils/blueprint"
import { formatDate, isNullOrEmpty } from "../../uitils/functions/global"
import { useDelete } from "../../contexts/Delete"
import ActionButton from "../../components/global/ActionButton"

export default function AllLesson() {
  const { destroy } = useDelete()
  const { handler } = useHandler()
  const {
    credentials: { user, token },
  } = useAuth()
  const [lessons, setLessons] = useState([blueprint.lesson])

  useEffect(() => {
    lesson.all(token, setLessons, handler)
  }, [handler.navigate, user])

  return handler.componentLoaded && <DashboardPageCompement title={"all lessons"}>
    {/* <h1>The all lessons are below in a table form</h1> */}
    <Table
      ths={
        <>
          <th className="py-3 px-4">Sno.</th>
          <th>Course</th>
          <th>Title</th>
          <th>Created On</th>
          <th>Action</th>
        </>
      }
      tds={
        !isNullOrEmpty(lessons) &&
        lessons.map((lesson, index) => (
          <tr key={lesson.id}>
            <td className="p-5">{index + 1}</td>
            <td>{lesson.course.title}</td>
            <td>{lesson.title}</td>
            <td>{formatDate(lesson.created_at)}</td>
            <td className="flex gap-2 pt-2">
              <ActionButton route={`./${lesson.id}`} name={"View"} />
              <ActionButton
                route={`./edit/${lesson.id}`}
                name={"Edit"}
                color="bg-gradient-to-r from-[#ffcc00] to-[#f57f17]"
              />
              <ActionButton
                name={"Delete"}
                onClick={() =>
                  destroy("/lessons", lesson.id, lesson.title + " lesson")
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
