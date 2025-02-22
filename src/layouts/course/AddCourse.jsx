import DashboardPageCompement from "../../components/global/DashboardPage"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import course from "../../uitils/api/course"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { isLoading } from "../../uitils/functions/global"
import TextArea from "../../components/form/TextArea"
import { useEffect } from "react"

export default function AddCourse() {
  const {
    credentials: { token, user },
  } = useAuth()
  const { handler } = useHandler()

  function handleSubmit(data) {
    course.store(token, data, handler)
  }

  return <DashboardPageCompement title={"add course"}>
    <div className="p-6 bg-gray-50  flex justify-center items-center">
      <div className=" w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-center text-xl font-semibold">Add Course</h1>
        <Form {...{ handleSubmit }}>
          <InputField
            type={"text"}
            name={"title"}
            placeholder={"Course title"}
          />
          <InputField
            type={"file"}
            name={"image"}
            accept={".jpg,.jpeg,.png"}
          />

          <TextArea
            type={"text"}
            name={"description"}
            placeholder={"Course description..."}
          />

          <InputField type={"hidden"} name={"user_id"} value={user.id} />
          <div className="text-center">
            <SubmitButton name={isLoading(handler, "Add Course")} />
          </div>
        </Form>
      </div>
    </div>
  </DashboardPageCompement>
}
