import DashboardPageCompement from "../../components/global/DashboardPage"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { isLoading } from "../../uitils/functions/global"
import SelectField from "../../components/form/SelectField"
import exam from "../../uitils/api/exam"
import blueprint from "../../uitils/blueprint"
import TextArea from "../../components/form/TextArea"

export default function AddExam() {
  const { credentials: { token } } = useAuth()
  const { handler } = useHandler()

  function handleSubmit(data) {
    exam.store(token, data, handler)
  }

  return (
    <DashboardPageCompement title={"add exam"}>
      <div className="p-6 bg-gray-50  flex justify-center items-center">
        <div className=" w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Initiate a new Exam/Test
          </h1>

          <Form {...{ handleSubmit }}>
            <InputField
              name={"title"}
              placeholder={"exam title"}
            />

            <TextArea
              name={'description'}
              placeholder={'exam description'}
            />

            <InputField
              type={"number"}
              name={"time_allowed"}
              placeholder={"Time limit in minues"}
            />

            <InputField
              type={"number"}
              name={"total_retakes"}
              placeholder={"Total allowed retakes"}
            />

            <InputField
              type={"number"}
              name={"passing_percentage"}
              placeholder={"the passing percentage out of 100"}
            />

            <SubmitButton name={isLoading(handler, "Add exam")} />
          </Form>
        </div>
      </div>
    </DashboardPageCompement>
  )
}
