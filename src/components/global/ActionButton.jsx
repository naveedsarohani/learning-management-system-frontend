import { Link } from "react-router-dom"

export default function ActionButton({
  color = "bg-gradient-to-r from-[#21bffd] to-[#217bfe]",
  name,
  route,
  onClick,
}) {
  return (
    <button
      className={`${color} rounded-lg py-2 px-4 text-white`}
      onClick={onClick}
    >
      <Link to={route}>{name}</Link>
    </button>
  )
}
