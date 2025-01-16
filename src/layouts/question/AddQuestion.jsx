import DashboardPageCompement from "../../components/global/DashboardPage"
import Form from "../../components/form/Form"
import InputField from "../../components/form/InputField"
import SubmitButton from "../../components/form/SubmitButton"
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler"
import { extractExcept, isLoading } from "../../uitils/functions/global"
import { useParams } from "react-router-dom"
import question from "../../uitils/api/question"
import SelectField from "../../components/form/SelectField"
import { useState } from "react"

export default function AddQuestion() {
  const {
    credentials: { token },
  } = useAuth()
  const { handler } = useHandler()
  const { assessmentId } = useParams()
  const [answerType, setAnswerType] = useState({ type: "MCQ" })

  function handleSubmit(data) {
    if (data.type === "MCQ") {
      data.answer = {
        answer_text: {
          A: data.A,
          B: data.B,
          C: data.C,
          D: data.D,
        },
        is_correct: data.is_correct,
      }
    } else {
      data.answer = {
        answer_text: "true/false",
        is_correct: data.is_correct,
      }
    }

    data = extractExcept(data, ["A", "B", "C", "D", "is_correct"])
    question.store(token, data, handler)
  }

  return (
    <DashboardPageCompement title={"add question"}>
      <div className="p-6 bg-gray-50  flex justify-center items-center">
        <div className=" w-full bg-white shadow-lg rounded-lg p-8">
          <h1>Add a new question </h1>

          <Form {...{ handleSubmit }}>
            <InputField name={"question_text"} placeholder={"question text"} />

            <SelectField
              name={"type"}
              data={["MCQ", "true/false"]}
              selectedItem={"MCQ"}
              set={setAnswerType}
            />

            {answerType.type === "MCQ" && (
              <>
                <InputField name={"A"} placeholder={"enter option for A"} />
                <InputField name={"B"} placeholder={"enter option for B"} />
                <InputField name={"C"} placeholder={"enter option for C"} />
                <InputField name={"D"} placeholder={"enter option for D"} />

                <SelectField
                  name={"is_correct"}
                  data={[
                    "A",
                    "B",
                    "C",
                    "D",
                    "Choose the correct option:disabled",
                  ]}
                />
              </>
            )}

            {answerType.type === "true/false" && (
              <SelectField
                name={"is_correct"}
                data={[
                  "true",
                  "false",
                  "choose the coorect option true or false:disabled",
                ]}
              />
            )}

            <InputField
              type={"hidden"}
              name={"assessment_id"}
              value={assessmentId}
            />

            <div className="mt-5">
              <SubmitButton name={isLoading(handler, "Add question")} />
            </div>
          </Form>
        </div>
      </div>
    </DashboardPageCompement>
  )
}
