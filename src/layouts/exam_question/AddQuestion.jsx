import DashboardPageCompement from "../../components/global/DashboardPage";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { extractExcept, isLoading } from "../../uitils/functions/global";
import { useParams } from "react-router-dom";
import question from "../../uitils/api/exam_question";
import SelectField from "../../components/form/SelectField";
import { useState } from "react";
import blueprint from "../../uitils/blueprint";

export default function AddQuestion() {
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const { examId } = useParams();
  const [answerType, setAnswerType] = useState({ type: 'MCQ' })

  function handleSubmit(data) {
    if (data.type === "MCQ") {
      data.answers = {
        A: data.A,
        B: data.B,
        C: data.C,
        D: data.D,
      }
    } else {
      data.answers = "the question is true/false optionary"
    }

    data = extractExcept(data, ['type', 'A', 'B', 'C', 'D']);
    question.store(token, data, handler);
  }

  return <DashboardPageCompement title={"add question"}>
    <h1>Add a new question </h1>
    <Form {...{ handleSubmit }}>
      <InputField
        name={"question_text"}
        placeholder={"question text"}
      />

      <InputField
        type={'number'}
        name={"carry_marks"}
        placeholder={"total marks on this question"}
      />

      <SelectField
        name={'type'}
        data={['MCQ', 'true/false', 'Please choose the question type:disabled']}
        selectedItem={'MCQ'}
        set={setAnswerType}
      />

      {answerType.type === 'MCQ' && <>
        <InputField
          name={"A"}
          placeholder={"enter option for A"}
        />
        <InputField
          name={"B"}
          placeholder={"enter option for B"}
        />
        <InputField
          name={"C"}
          placeholder={"enter option for C"}
        />
        <InputField
          name={"D"}
          placeholder={"enter option for D"}
        />

        <SelectField
          name={'correct_option'}
          data={['A', 'B', 'C', 'D', 'Choose the correct option:disabled']}
        />
      </>}

      {answerType.type === 'true/false' && <SelectField
        name={'correct_option'}
        data={['true', 'false', 'choose the coorect option true or false:disabled']}
      />}

      <InputField
        type={"hidden"}
        name={"exam_id"}
        value={examId}
      />

      <SubmitButton name={isLoading(handler, "Add question")} />
    </Form>
  </DashboardPageCompement>;
}
