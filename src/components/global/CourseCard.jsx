import blueprint from "../../uitils/blueprint";
import { formatDate, readFile } from "../../uitils/functions/global";

export default function CourseCard({ course = blueprint.course }) {
    return <div key={course.id}>
        <div>
            <img src={readFile(course.image)} alt="poster" />
        </div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <span>{formatDate(course.created_at)}</span>

    </div>
}