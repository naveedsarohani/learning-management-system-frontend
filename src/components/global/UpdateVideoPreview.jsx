import { readFile } from "../../uitils/functions/global";

export default function UpdateVideoPreview({ currentVideo, newVideo = null }) {
    return <video src={newVideo ?? readFile(currentVideo)} alt="video file" id="updateVideoPreview" controls />
}