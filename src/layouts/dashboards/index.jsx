import DashboardPageCompement from "../../components/global/DashboardPage"
import Header from "../../components/global/Header"
import CityPassRatioGraph from "../../components/graphs/CityPassRatioGraph"
import CoursesGraph from "../../components/graphs/CoursesGraph"
import ExamGraph from "../../components/graphs/ExamGraph"
import UsersGraph from "../../components/graphs/UsersGraph"
import { useDelete } from "../../contexts/Delete"

export default function DashboardHomePage() {
  const { destory } = useDelete()

  function handleDelete() {
    destory("/courses", 59, "Php laravel course")
  }

  return (
    <DashboardPageCompement title={""}>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1  gap-6 p-10">
        <div>
          <Header
            title={`Total Instructors`}
            total={"5550"}
            icon={<i className="fas fa-chalkboard-teacher text-white"></i>}
          />
          <Header
            title={`Total Students`}
            total={"5550"}
            icon={<i className="fas fa-user-graduate text-white "></i>}
          />
          <Header
            title={`Total Courses`}
            total={"5550"}
            icon={<i className="fas fa-book text-white"></i>}
          />
        </div>
        <div className="flex justify-between w-full flex-col sm:flex-row">
          <CoursesGraph />
          <ExamGraph />
        </div>
        <CityPassRatioGraph />
      </div>
    </DashboardPageCompement>
  )
}
