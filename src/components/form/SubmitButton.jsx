export default function SubmitButton({ name, color = "bg-red-300" }) {
  return <input className={`${color}`} type="submit" value={name} />
}
