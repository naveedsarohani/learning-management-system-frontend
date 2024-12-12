import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import blueprint from "../../uitils/blueprint";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import { useParams } from "react-router-dom";
import { useHandler } from "../../contexts/Handler";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import { isLoading } from "../../uitils/functions/global";
import lessonapi from "../../uitils/api/lesson";

export default function EditLesson() {
  const [lesson, setLesson] = useState(blueprint.lesson);
  const {
    credentials: { token },
  } = useAuth();
  const { handler } = useHandler();
  const { lessonId } = useParams();

  function handleSubmit(data) {
    lessonapi.update(lessonId, data, token, handler);
  }

  useEffect(() => {
    lessonapi.show(lessonId, token, setLesson, handler);
  }, []);

  return  lesson.id && <DashboardPageCompement title={"edit lesson"}>
      <h1>This is edit Lesson page</h1>

      <Form {...{ handleSubmit }}>
        <InputField
          type={"text"}
          name={"title"}
          value={lesson.title}
          set={setLesson}
          
        />

        <InputField
            type={"file"}
            name={"content"}
            set={setLesson}
            accept={".pdf,.docx,.xlsx,.txt,.mp4,.3gp,mkv"}
          />        

        <SubmitButton name={isLoading(handler, "Edit Lesson")} />
      </Form>
    </DashboardPageCompement>
}
