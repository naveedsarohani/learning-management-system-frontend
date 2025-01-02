import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Authentication"
import { useHandler } from "../../contexts/Handler";
import course from "../../uitils/api/course";
import blueprint from "../../uitils/blueprint";
import CourseCard from "../../components/global/CourseCard";
import { isNullOrEmpty } from "../../uitils/functions/global";
import NoContent from "../../components/global/NoContent";

export default function Home() {
    const { credentials: { user, token } } = useAuth();
    const [courses, setCourses] = useState([blueprint.course]);
    const { handler } = useHandler();

    useEffect(() => {
        course.all(token, setCourses, handler);
    }, [location.pathname, user]);

    return <div>
        <h1>All Courses</h1>
        {!isNullOrEmpty(courses[0].id)
            ? courses.map(course => <CourseCard routePrefix="/me" course={course} />)
            : <NoContent message="there is no course for you" />
        }
    </div>
}