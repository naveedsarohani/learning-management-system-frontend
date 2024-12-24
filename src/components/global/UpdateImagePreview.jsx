import { readFile } from "../../uitils/functions/global";

export default function UpdateImagePreview({ currentImage, newImage = null, classes }) {
    return <img
        src={newImage ?? readFile(currentImage)}
        alt="Image file"
        id="updateImagePreview"
        className={classes}
    />
}