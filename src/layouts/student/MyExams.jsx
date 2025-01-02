import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import exam from "../../uitils/api/exam"
import blueprint from "../../uitils/blueprint"
import ExamCard from "../../components/global/ExamCard"
import { isNullOrEmpty } from "../../uitils/functions/global"
import NoContent from "../../components/global/NoContent"

export default function MyExams() {
  const {
    credentials: { user, token },
  } = useAuth()
  const [exams, setExams] = useState([blueprint.exam])
  const { handler } = useHandler()

  useEffect(() => {
    exam.all(token, setExams, handler)
  }, [location.pathname, user])

  return (
    <div className="px-4 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Exams</h1>
      {!isNullOrEmpty(exams[0].id) ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exams.map((exam) => (
            <ExamCard exam={exam} key={exam.id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 bg-white shadow rounded-lg">
          <NoContent message="There is not any exam or test for you" />
        </div>
      )}
    </div>
  )
}
