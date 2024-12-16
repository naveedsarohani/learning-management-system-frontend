import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import blueprint from "../../uitils/blueprint";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import { useParams } from "react-router-dom";
import { useHandler } from "../../contexts/Handler";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import { isLoading, isNullOrEmpty } from "../../uitils/functions/global";
import questionapi from "../../uitils/api/question";
import SelectField from "../../components/form/SelectField";

export default function EditQuestion() {
  const [question, setQuestion] = useState(blueprint.question);
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const { questionId } = useParams();

  function handleSubmit(data) {
    questionapi.update(questionId, data, token, handler);
  }

  useEffect(() => {
    questionapi.show(questionId, token, setQuestion, handler);
  }, []);

  return !isNullOrEmpty(question) && <DashboardPageCompement title={"edit question"}>
    <h1>This is edit question page</h1>

    <Form {...{ handleSubmit }}>
      <InputField
        name={"question_text"}
        value={question.question_text}
        set={setQuestion}
      />

      <SelectField
        name={'type'}
        selected={question.type}
        set={setQuestion}
        data={['MCQ', 'true/false']}
      />

      <SubmitButton name={isLoading(handler, "Edit question")} />
    </Form>
  </DashboardPageCompement>
}
