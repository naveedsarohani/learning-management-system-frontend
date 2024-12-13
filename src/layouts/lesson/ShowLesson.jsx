import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import lessonapi from "../../uitils/api/lesson";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import { formatDate } from "../../uitils/functions/global";

export default function ShowLesson() {
  const { lessonId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [lesson, setLesson] = useState(blueprint.lesson);

  useEffect(() => {
    lessonapi.show(lessonId, token, setLesson, handler);
  }, [lessonId]);

  return (
    <DashboardPageCompement title={"specified lesson"}>
      <Link to={'./add-lesson'}>Add a new lesson</Link>

      <div>
        <h1>{lesson.title}</h1>
        <p>{lesson.content}</p>
        <p>{formatDate(lesson.updated_at)}</p>
      </div>
    </DashboardPageCompement>
  );
}
