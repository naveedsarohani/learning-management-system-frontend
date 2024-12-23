import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler";
import DashboardPageCompement from "../../components/global/DashboardPage";
import course from "../../uitils/api/course";
import blueprint from "../../uitils/blueprint";
import CourseCard from "../../components/global/CourseCard";

export default function StudentProfile() {
    const { credentials: { user, token }, user: { revoke } } = useAuth();
    const [courses, setCourses] = useState([blueprint.course]);
    const { handler } = useHandler();

    useEffect(() => {
        course.all(token, setCourses, handler);
    }, [location.pathname, user]);

    return <DashboardPageCompement title={'student prifle'}>
        <div>
            {/* courses */}
            {courses.map(course => <CourseCard course={course} />)}
        </div>
    </DashboardPageCompement>
}