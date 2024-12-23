import { Link } from "react-router-dom"

export default function ActionButton({
  color = "bg-gradient-to-r from-[#21bffd] to-[#217bfe]",
  name,
  route = null,
  onClick,
  icon = null
}) {
  return (
    <button
      className={`${color} rounded-lg py-2 px-4 text-white`}
      onClick={onClick}
    >
      {icon && <i className={`fas ${icon} text-xs`}></i>}
      {route ? <Link to={route}>{name}</Link> : name}
    </button>
  )
}
