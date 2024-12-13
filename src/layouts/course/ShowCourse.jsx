import { Link, useParams } from "react-router-dom";
import DashboardPageCompement from "../../components/global/DashboardPage";
import { useEffect, useState } from "react";
import blueprint from "../../uitils/blueprint";
import courseapi from "../../uitils/api/course";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import lesson from "../../uitils/api/lesson";
import { formatDate } from "../../uitils/functions/global";
import { useDelete } from "../../contexts/Delete";


export default function ShowCourse() {
  const { courseId } = useParams();
  const { credentials: { token } } = useAuth();
  const { handler } = useHandler();
  const [course, setCourse] = useState(blueprint.course);
  const [lessons, setLessons]=useState([blueprint.lesson]);
  const {destroy}=useDelete();

  useEffect(() => {
    courseapi.show(courseId, token, setCourse, handler);
      lesson.courseLesson(courseId,token,setLessons,handler);
  }, [courseId]);

  return (
    <DashboardPageCompement title={"specified course"}>
      <Link to={'./add-lesson'}>Add a new lesson</Link>

      {/* course itself */}
      <div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>
      
      <div>
        <h2>Lessons</h2>
        {lessons.map(lesson=><div key={lesson.id}>
          <h3>{lesson.title}</h3>
          <p>{lesson.content}</p>
          <span>{formatDate(lesson.created_at)}</span>
          <button onClick={()=> destroy('/lessons',lesson.id,lesson.title + " lesson")}>Delete</button>
        </div>)}
      </div>


      
    </DashboardPageCompement>
  );
}
