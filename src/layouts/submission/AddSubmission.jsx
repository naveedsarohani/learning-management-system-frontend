import DashboardPageCompement from "../../components/global/DashboardPage";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { isLoading } from "../../uitils/functions/global";
import { useParams } from "react-router-dom";
import answer from "../../uitils/api/answer";
import blueprint from "../../uitils/blueprint";
import SelectField from "../../components/form/SelectField";
import { useState } from "react";

export default function AddSubmission() {
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const { questionId } = useParams();
  const [answerType, setAnswerType] = useState({ td: 'ht', type: 'MCQs' })

  function handleSubmit(data = blueprint.answer) {
    answer.store(token, data, handler);
  }

  return <DashboardPageCompement title={"add answer"}>
    <h1>Add a new answer </h1>

    <Form {...{ handleSubmit }}>
      <InputField
        name={"answer_text"}
        placeholder={"answer text"}
      />

      <SelectField
        name={'type'}
        data={['MCQs', 'true/false']}
        set={setAnswerType}
      />

      {answerType.type === 'MCQs' && <>
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
          data={['Choose the correct option type', 'A', 'B', 'C', 'D']}
        />
      </>}

      {answerType.type === 'true/false' && <SelectField
        name={'correct_option'}
        value={'Choose the right answer option'}
        data={['true', 'false']}
      />}

      <InputField
        type={"hidden"}
        name={"question_id"}
        value={questionId}
      />

      <SubmitButton name={isLoading(handler, "Add Answer")} />
    </Form>
  </DashboardPageCompement>;
}
