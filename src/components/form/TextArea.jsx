import { useHandler } from "../../contexts/Handler"
import {
  capEach,
  handleInputChange,
  separateBy,
} from "../../uitils/functions/global"

export default function TextArea({
  name,
  value = undefined,
  set,
  className,
  placeholder,
}) {
  const {
    handler: { validationErrors },
  } = useHandler()

  return (
    <label>
      {capEach(separateBy(name, '_'))}
      <textarea
        name={name}
        className={`${className} w-full mb-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4`}
        onChange={set && ((e) => handleInputChange(e, set))}
        placeholder={placeholder ?? ""}
        rows={5}
        cols={5}
        defaultValue={value}
      >
      </textarea>

      {validationErrors && (
        <span className="text-red-500 font-normal">
          {validationErrors[name]}
        </span>
      )}
    </label>
  )
}
