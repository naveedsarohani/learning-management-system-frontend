import DashboardPageCompement from "../../components/global/DashboardPage";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { isLoading } from "../../uitils/functions/global";
import { useParams } from "react-router-dom";
import question from "../../uitils/api/question";
import SelectField from "../../components/form/SelectField";

export default function AddQuestion() {
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const { assessmentId } = useParams();

  function handleSubmit(data) {
    question.store(token, data, handler);
  }

  return <DashboardPageCompement title={"add question"}>
    <h1>Add a new question </h1>
    
    <Form {...{ handleSubmit }}>
      <InputField
        name={"question_text"}
        placeholder={"question text"}
      />

      <SelectField
        name={'type'}
        data={['MCQ', 'true/false']}
      />

      <InputField
        type={"hidden"}
        name={"assessment_id"}
        value={assessmentId}
      />

      <SubmitButton name={isLoading(handler, "Add question")} />
    </Form>
  </DashboardPageCompement>;
}
