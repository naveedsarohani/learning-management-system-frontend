import blueprint from "../../uitils/blueprint";
import { capitalize, readFile } from "../../uitils/functions/global";

export default function LessonCard({ lesson = blueprint.lesson, showTitle = true }) {
    return <div>
        <h3>{showTitle && capitalize(lesson.title)}</h3>
        <video src={readFile(lesson.content)}></video>
    </div>
}