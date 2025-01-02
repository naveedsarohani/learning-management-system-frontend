import blueprint from "../../uitils/blueprint";
import { capitalize, readFile } from "../../uitils/functions/global";

export default function LessonCard({ lesson = blueprint.lesson }) {
    return <div>
        <h3>{capitalize(lesson.title)}</h3>
        <video src={readFile(lesson.content)}></video>
    </div>
}