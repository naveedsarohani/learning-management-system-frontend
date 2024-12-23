import { readFile } from "../../uitils/functions/global";

export default function UpdateImagePreview({ currentImage, newImage = null }) {
    return <img src={readFile(newImage ?? currentImage)} alt="Image file" id="updateImagePreview" />
}