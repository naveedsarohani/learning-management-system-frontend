import blueprint from "../../uitils/blueprint";
import { capitalize, readFile } from "../../uitils/functions/global";

export default function LessonCard({
    lesson = blueprint.lesson,
    showTitle = true,
    next,
    showControls = false,
    clickToPlay
}) {
    return (
        <div>
            <h3>{showTitle && capitalize(lesson.title)}</h3>
            <video
                src={readFile(lesson.content)}
                onEnded={next}
                controls={showControls}
                onClick={clickToPlay}
            ></video>
        </div>
    );
}



// const [videoCompleted, setVideoCompleted] = useState(false);

// useEffect(() => {
//     if (videoCompleted) {
//         console.log('updating progress table');
//         progressapi.update(courseId, { lesson_index: newIndex + 1 }, token, handler);
//     }
// }, [videoCompleted]);