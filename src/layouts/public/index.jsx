import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Authentication";
import course from "../../uitils/api/course";
import { useHandler } from "../../contexts/Handler";
import blueprint from "../../uitils/blueprint";
import CourseCard from "../../components/global/CourseCard";
import InstructorCard from "../../components/global/InstructorCard";
import auth from "../../uitils/api/auth";

export default function Home() {
    const { credentials: { user, token } } = useAuth();
    const [instructors, setInstructors] = useState([blueprint.user]);
    const [courses, setCourses] = useState([blueprint.course]);
    const { handler } = useHandler();

    useEffect(() => {
        course.all(token, setCourses, handler);
        auth.users(token, setInstructors, { role: 'instructor' });
    }, [location.pathname, user]);

    return <div>

        {/* courses */}
        <div>
            <h1>All Course</h1>
            {courses.map(course => <CourseCard course={course} />)}
        </div>

        <hr />

        {/* instructors */}
        <div>
            <h1>All Instructors</h1>
            {instructors.map(instructor => <InstructorCard instructor={instructor} />)}
        </div>
    </div>
}