import { capEach } from "../../uitils/functions/global";

export default function SubmitButton({
  name,
  color = "bg-gradient-to-r from-[#21bffd] to-[#217bfe]",
}) {
  return (
    <input
      className={`${color} text-white py-2 px-4 rounded-lg cursor-pointer`}
      type="submit"
      value={capEach(name)}
    />
  )
}
