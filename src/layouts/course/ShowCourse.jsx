import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import courseapi from "../../uitils/api/course";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";

export default function ShowCourse() {
  const { courseId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [course, setCourse] = useState(blueprint.course);

  useEffect(() => {
    courseapi.show(courseId, token, setCourse, handler);
  }, [courseId]);

  return (
    <DashboardPageCompement title={"specified course"}>
      <Link to={'./add-lesson'}>Add a new lesson</Link>

      {/* course itself */}
      <div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>

      
    </DashboardPageCompement>
  );
}
