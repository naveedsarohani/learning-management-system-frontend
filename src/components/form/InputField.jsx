import { useHandler } from "../../contexts/Handler"
import {
  capEach,
  capitalize,
  handleInputChange,
  separateBy,
} from "../../uitils/functions/global"

export default function InputField({
  type,
  name,
  value = null,
  className,
  placeholder,
  accept,
  set = null,
  customeFunc = null,
}) {
  const {
    handler: { validationErrors },
  } = useHandler()

  return (
    <label className="block text-sm">
      {/* {capEach(separateBy(name, "_"))}{" "} */}
      <input
        className={
          className ??
          "form-control mb-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
        }
        type={type ?? "text"}
        name={name}
        onChange={
          customeFunc
            ? (e) => customeFunc(e)
            : set && ((e) => handleInputChange(e, set))
        }
        placeholder={capitalize(placeholder) ?? ""}
        value={value}
        accept={accept ?? ""}
      />
      {validationErrors && (
        <span className="text-red-500 font-normal">
          {validationErrors[name]}
        </span>
      )}
    </label>
  )
}
