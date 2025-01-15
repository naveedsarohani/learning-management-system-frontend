import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import Header from "../../components/global/Header"
import CityPassRatioGraph from "../../components/graphs/CityPassRatioGraph"
import CoursesGraph from "../../components/graphs/CoursesGraph"
import ExamGraph from "../../components/graphs/ExamGraph"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import auth from '../../uitils/api/auth';
import enrollment from '../../uitils/api/enrollment';
import course from '../../uitils/api/course';
import { role } from '../../uitils/functions/constants';
import exam from "../../uitils/api/exam"
import result from "../../uitils/api/exam_submission"
import blueprint from "../../uitils/blueprint"

export default function DashboardHomePage() {
  const { credentials: { user, token } } = useAuth()
  const { handler } = useHandler();
  const [data, setData] = useState({ instructors: 0, students: 0, courses: 0, exams: 0, });
  const [results, setResults] = useState([blueprint.examSubmission]);
  const [courses, setCourse] = useState([blueprint.course]);

  const setCount = (data = [{}], field = null) => {
    if (!field) return setUsersCount(data);
    setData(pre => ({ ...pre, [field]: data.length }));
  }

  const setUsersCount = data => setData(pre => ({
    ...pre,
    instructors: data.filter(user => user.role == role.INSTRUCTOR).length,
    students: data.filter(user => user.role == role.STUDENT).length,
  }));

  useEffect(() => {
    user.role === role.ADMIN && auth.users(token, data => setCount(data), handler);
    user.role === role.INSTRUCTOR && enrollment.all(token, data => setCount(data, 'students'), handler, { 'course.user_id': user.id, getOnlyProperty: 'student' })

    // courses
    course.all(token, data => setCount(data, 'courses'), handler, user.role !== role.ADMIN && { user_id: user.id })

    // exams
    exam.all(token, data => setCount(data, 'exams'), handler, user.role !== role.ADMIN && { instructor_id: user.id })
    result.all(token, setResults, handler, user.role !== role.ADMIN && { 'exam.instructor_id': user.id })


    // to course by enrollments
    enrollment.all(token, setCourse, handler, { getOnlyProperty: 'course' })
  }, [])

  return handler.componentLoaded && <DashboardPageCompement title={"Dashboard"}>
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1  gap-6 p-10">
      <div>
        {user.role === role.ADMIN && <Header
          title={`Total Instructors`}
          total={data.instructors}
          icon={<i className="fas fa-chalkboard-teacher text-white"></i>}
        />}
        <Header
          title={`Total Students`}
          total={data.students}
          icon={<i className="fas fa-user-graduate text-white "></i>}
        />
        <Header
          title={`Total Courses`}
          total={data.courses}
          icon={<i className="fas fa-book text-white"></i>}
        />
        <Header
          title={`Total Exams`}
          total={data.exams}
          icon={<i className="fas fa-pen text-white"></i>}
        />
      </div>

      <div className="flex justify-between w-full flex-col sm:flex-row">
        <CoursesGraph courses={courses} />
        <ExamGraph results={results} />
      </div>
      <CityPassRatioGraph results={results} />
    </div>
  </DashboardPageCompement>
}