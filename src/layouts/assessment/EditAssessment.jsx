import { useEffect, useState } from "react"
import DashboardPageCompement from "../../components/global/DashboardPage"
import blueprint from "../../uitils/blueprint"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import { useParams } from "react-router-dom"
import { useHandler } from "../../contexts/Handler"
import SubmitButton from "../../components/form/SubmitButton"
import { useAuth } from "../../contexts/Authentication"
import { isLoading } from "../../uitils/functions/global"
import assessmentapi from "../../uitils/api/assessment"
import SelectField from "../../components/form/SelectField"

export default function EditAssessment() {
  const [assessment, setAssessment] = useState(blueprint.assessment)
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const { assessmentId } = useParams()

  function handleSubmit(data) {
    assessmentapi.update(assessmentId, data, token, handler)
  }

  useEffect(() => {
    assessmentapi.show(assessmentId, token, setAssessment, handler)
  }, [])

  return (
    handler.componentLoaded &&
    assessment.id && (
      <DashboardPageCompement title={"edit assessment"}>
        <div className="p-6 bg-gray-50  flex justify-center items-center">
          <div className=" w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Edit Assessment
            </h1>
            <Form {...{ handleSubmit }}>
              {/* Title Field */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <InputField
                  name={"title"}
                  value={assessment.title}
                  set={setAssessment}
                />
              </div>

              {/* Type Field */}
              <div className="mb-4">
                <SelectField
                  name={"type"}
                  selected={assessment.type}
                  set={setAssessment}
                  data={["quiz", "test", "exam"]}
                />
              </div>

              {/* Time Limit Field */}
              <div className="mb-4">
                <InputField
                  type={"number"}
                  name={"time_limit"}
                  value={assessment.time_limit}
                  set={setAssessment}
                />
              </div>

              {/* Retakes Allowed Field */}
              <div className="mb-6">
                <InputField
                  type={"number"}
                  name={"retakes_allowed"}
                  value={assessment.retakes_allowed}
                  set={setAssessment}
                />
              </div>

              {/* Unlocks At Field */}
              <div className="mb-6">
                <InputField
                  type={"number"}
                  name={"unlocks_at"}
                  value={assessment.unlocks_at}
                  set={setAssessment}
                />
              </div>

              {/* Submit Button */}
              <SubmitButton
                name={isLoading(handler, "save assessment")}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
              />
            </Form>
          </div>
        </div>
      </DashboardPageCompement>
    )
  )
}
