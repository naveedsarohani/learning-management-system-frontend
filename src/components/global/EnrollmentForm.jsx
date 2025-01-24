import { set } from "react-hook-form"
import blueprint from "../../uitils/blueprint"
import {
  capitalize,
  extractExcept,
  isLoading,
} from "../../uitils/functions/global"
import Form from "../form/Form"
import InputField from "../form/InputField"
import SubmitButton from "../form/SubmitButton"
import ActionButton from "./ActionButton"
import enrollment from "../../uitils/api/enrollment"
import progress from "../../uitils/api/progress"

export default function EnrollmentForm({
  course = blueprint.course,
  userId,
  token,
  handler,
  set,
  setEnrolled,
}) {
  const handleSubmit = async (data) => {
    data = extractExcept(data, ["feedback_text"])
    await enrollment.enroll(token, data, handler)
    await progress.initiate(
      token,
      {
        user_id: userId,
        course_id: course.id,
      },
      handler
    )
    set(false)
    setEnrolled(true)
  }

  return (
    <div>
      <div>
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal bg-white w-[30rem] h-[13rem] py-[4rem] px-[1rem] rounded-lg shadow-lg relative">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white rounded-t-lg p-4 absolute top-0 left-0 right-0">
              <h1 className="text-xl">
                You are enrolling for the course{" "}
                <strong>{capitalize(course.title)}</strong>
              </h1>
            </div>

            <Form handleSubmit={handleSubmit}>
              <InputField
                name="feedback_text"
                placeholder="Enter your feedback for the course enrollment"
              />

              <InputField showLabel={false} type="hidden" name="user_id" value={userId} />

              <InputField showLabel={false} type="hidden" name="course_id" value={course.id} />
              <div className="mt-3 flex gap-5 ml-2">
                <SubmitButton name={isLoading(handler, "Confirm Enrollmemt")} />
                <ActionButton
                  name="Cancel"
                  onClick={() => set(false)}
                  color="bg-gradient-to-r from-[#ff5f57] to-[#d32f2f]"
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
