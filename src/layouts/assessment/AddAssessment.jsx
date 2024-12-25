import DashboardPageCompement from "../../components/global/DashboardPage"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { isLoading } from "../../uitils/functions/global"
import { useParams } from "react-router-dom"
import SelectField from "../../components/form/SelectField"
import assessment from "../../uitils/api/assessment"

export default function AddAssessment() {
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const { courseId } = useParams()

  function handleSubmit(data) {
    assessment.store(token, data, handler)
  }

  return (
    <DashboardPageCompement title={"add assessment"}>
      <h1>Add a new assessment</h1>

      <div className="p-6 bg-gray-50  flex justify-center items-center">
        <div className=" w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Edit Assessment
          </h1>

          <Form {...{ handleSubmit }}>
            <InputField name={"title"} placeholder={"asessment title"} />

            <SelectField
              name={"type"}
              value={"Choose the assessment type"}
              data={["quiz", "test", "exam"]}
            />

            <InputField
              type={"number"}
              name={"time_limit"}
              placeholder={"Time limit in minues"}
            />

            <InputField
              type={"number"}
              name={"retakes_allowed"}
              placeholder={"Total allowed retakes"}
            />

            <InputField type={"hidden"} name={"course_id"} value={courseId} />

            <SubmitButton name={isLoading(handler, "Add assessment")} />
          </Form>
        </div>
      </div>
    </DashboardPageCompement>
  )
}
