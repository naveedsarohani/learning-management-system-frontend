import DashboardPageCompement from "../../components/global/DashboardPage"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { isLoading } from "../../uitils/functions/global"
import { useParams } from "react-router-dom"
import lesson from "../../uitils/api/lesson"
import { useEffect } from "react"

export default function AddLesson() {
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const { courseId } = useParams()

  function handleSubmit(data) {
    lesson.store(token, data, handler)
  }

  return (
    <DashboardPageCompement title={"add lesson"}>
      <div className="p-6 bg-gray-50  flex justify-center items-center">
        <div className=" w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add Assessment
          </h1>

          <Form {...{ handleSubmit }}>
            <InputField name={"title"} placeholder={"Lesson title"} />

            <InputField
              type={"file"}
              name={"content"}
              placeholder={"Lesson Content"}
              accept={".mp4,.3gp,.mkv"}
            />

            <InputField type={"hidden"} name={"course_id"} value={courseId} />

            <SubmitButton name={isLoading(handler, "Add Lesson")} />
          </Form>
        </div>
      </div>
    </DashboardPageCompement>
  )
}
