import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import courseapi from "../../uitils/api/course";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";

export default function ShowLesson() {
  const { id } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [course, setCourse] = useState(blueprint.course);

  useEffect(() => {
    courseapi.show(id, token, setCourse, handler);
  }, [id]);

  return (
    <DashboardPageCompement title={"specified course"}>
      <Link to={'./add-lesson'}>Add a new lesson</Link>

      <div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>
    </DashboardPageCompement>
  );
}
