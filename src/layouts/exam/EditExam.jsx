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
import examapi from "../../uitils/api/exam"
import SelectField from "../../components/form/SelectField"
import TextArea from "../../components/form/TextArea"

export default function EditExam() {
  const [exam, setExam] = useState(blueprint.exam)
  const { credentials: { token } } = useAuth()
  const { handler } = useHandler()
  const { examId } = useParams()

  function handleSubmit(data) {
    examapi.update(examId, data, token, handler)
  }

  useEffect(() => {
    examapi.show(examId, token, setExam, handler)
  }, [])

  return (
    exam.id && (
      <DashboardPageCompement title={"edit exam"}>
        <div className="p-6 bg-gray-50  flex justify-center items-center">
          <div className=" w-full bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Edit Exam/Test
            </h1>
            <Form {...{ handleSubmit }}>
              <InputField
                name={"title"}
                value={exam.title}
                set={setExam}
                placeholder={"exam title"}
              />

              <TextArea
                name={'description'}
                value={exam.description}
                set={setExam}
                placeholder={'exam description'}
              />

              <InputField
                type={"number"}
                name={"time_allowed"}
                value={exam.time_allowed}
                set={setExam}
                placeholder={"Time limit in minues"}
              />

              <InputField
                type={"number"}
                name={"passing_percentage"}
                value={exam.passing_percentage}
                set={setExam}
                placeholder={"the passing percentage out of 100"}
              />

              <InputField
                type={"datetime-local"}
                name={"starts_at"}
                value={exam.starts_at}
                set={setExam}
                placeholder={"select the data and time to strt the exam at"}
              />

              <SubmitButton name={isLoading(handler, "save changes")} />
            </Form>
          </div>
        </div>
      </DashboardPageCompement>
    )
  )
}
