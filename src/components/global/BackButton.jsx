import { FaArrowLeft } from "react-icons/fa";
import { useHandler } from "../../contexts/Handler";

export default function BackButton() {
    const { handler: { navigate } } = useHandler();

    return <button
        onClick={() => navigate(-1)}
        className=" py-2 px-4 rounded-lg bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white flex justify-center items-center gap-2"
    >
        <FaArrowLeft />
        Go Back
    </button>
}