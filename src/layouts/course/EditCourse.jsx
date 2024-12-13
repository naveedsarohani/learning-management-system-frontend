import { useEffect, useState } from "react";
import DashboardPageCompement from "../../components/global/DashboardPage";
import blueprint from "../../uitils/blueprint";
import courseapi from "../../uitils/api/course";
import Form from "../../components/form/Form";
import InputField from "../../components/form/InputField";
import { useParams } from "react-router-dom";
import { useHandler } from "../../contexts/Handler";
import SubmitButton from "../../components/form/SubmitButton";
import { useAuth } from "../../contexts/Authentication";
import { isLoading } from "../../uitils/functions/global";
import TextArea from "../../components/form/TextArea";

export default function EditCourse() {
  const [course, setCourse] = useState(blueprint.course);
  const { credentials: { token, user } } = useAuth();
  const { handler } = useHandler();
  const { courseId } = useParams();

  function handleSubmit(data) {
    courseapi.update(courseId, data, token, handler);
  }

  useEffect(() => {
    courseapi.show(courseId, token, setCourse, handler);
  }, []);

  return course.id && <DashboardPageCompement title={"edit course"}>
    <h1>This is edit course page</h1>

    <Form {...{ handleSubmit }}>
      <InputField
        name={"title"}
        value={course.title}
        set={setCourse}
        placeholder={"Course title"}
      />

      <TextArea
        name={"description"}
        value={course.description}
        set={setCourse}
        placeholder={"Course description..."}
      />

      <InputField
        type={"hidden"}
        name={"user_id"}
        value={user.id}
      />

      <InputField type={"file"} name={"image"} accept={".jpg,.jpeg.png"} />

      <SubmitButton name={isLoading(handler, "Edit Course")} />
    </Form>
  </DashboardPageCompement>
}
