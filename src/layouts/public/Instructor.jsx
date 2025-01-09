import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import course from "../../uitils/api/course";
import blueprint from "../../uitils/blueprint";
import { useAuth } from "../../contexts/Authentication";
import { useHandler } from "../../contexts/Handler";
import auth from "../../uitils/api/auth";
import { capEach, readFile } from "../../uitils/functions/global";
import CourseCard from "../../components/global/CourseCard";

export default function Instructor() {
    const { handler } = useHandler();
    const { instructorId } = useParams();
    const { credentials: { token } } = useAuth();
    const [instructor, setInstructor] = useState(blueprint.user);
    const [courses, setCourses] = useState([blueprint.course]);

    useEffect(() => {
        course.all(token, setCourses, handler, { user_id: parseInt(instructorId) });
    }, []);

    useEffect(() => {
        courses[0].id && setInstructor(courses[0].user);
    }, [courses]);

    return handler.componentLoaded && <div>
        <div className="profile">
            <img className="rounded w-20" src={readFile(instructor.image)} alt="" />
            <h1>Welcome to, <strong>{capEach(instructor.name)}</strong></h1>
        </div>

        <div className="courses flex">
            {courses.map(course => <CourseCard course={course} />)}
        </div>
    </div>
}