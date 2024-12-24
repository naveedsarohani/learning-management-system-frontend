import BackButton from "../components/global/BackButton"
import { useHandler } from "../contexts/Handler"

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
      <BackButton />
    </div>
  )
}
