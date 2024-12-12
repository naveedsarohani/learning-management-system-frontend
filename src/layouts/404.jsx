import { useHandler } from "../contexts/Handler"
import { FaArrowLeft } from "react-icons/fa6"

export default function NotFound404() {
  const {
    handler: { location, navigate },
  } = useHandler()

  return (
    <div className="flex justify-center items-center flex-col min-h-screen gap-5">
      <h1 className="text-6xl font-semibold">404 </h1>
      <h2 className="text-2xl">
        The Route
        <span className=" px-4 bg-gradient-to-r from-[#21bffd] to-[#217bfe] bg-clip-text text-transparent">
          {location.pathname}
        </span>
        <span className="font-bold">NOT FOUND</span>
      </h2>
      <button
        onClick={() => navigate(-1)}
        className=" py-2 px-4 rounded-lg bg-gradient-to-r from-[#21bffd] to-[#217bfe] text-white flex justify-center items-center gap-2"
      >
        <FaArrowLeft />
        Go Back
      </button>
    </div>
  )
}
