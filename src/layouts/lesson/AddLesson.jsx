import DashboardPageCompement from "../../components/global/DashboardPage";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { isLoading } from "../../uitils/functions/global";
import { useParams } from "react-router-dom";
import lesson from "../../uitils/api/lesson";

export default function AddLesson() {
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const { id } = useParams();

  function handleSubmit(data) {
    lesson.store(token, data, handler);
  }

  return <DashboardPageCompement title={"add lesson"}>
    <h1>Add a new lesson </h1>

    <Form {...{ handleSubmit }}>
      <InputField
        name={"title"}
        placeholder={"Lesson title"}
      />

      <InputField
        type={"file"}
        name={"content"}
        placeholder={"Lesson Content"}
        accept={".pdf,.docx,.xlsx,.txt,.mp4,.3gp,mkv"}
      />

      <InputField
        type={"hidden"}
        name={"course_id"}
        value={id}
      />

      <SubmitButton name={isLoading(handler, "Add Lesson")} />
    </Form>
  </DashboardPageCompement>;
}
