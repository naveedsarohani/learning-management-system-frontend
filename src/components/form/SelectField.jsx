import { useHandler } from "../../contexts/Handler"
import { capEach, capitalize, handleInputChange, has } from "../../uitils/functions/global"

export default function SelectField({
  data = [''],
  name,
  value = null,
  className,
  selectedItem = null,
  set = null,
}) {
  const { handler: { validationErrors } } = useHandler()
  const items = (has(data, ':disabled')).items;
  const defaultOption = (has(data, ':disabled')).option ?? (value ?? "Please choose one of the following");

  function getOptions() {
    return items.map((item, index) => {
      if (typeof item == 'object') {
        const { id, name } = item;

        return <option
          defaultValue={selectedItem == name}
          selected={selectedItem == name}
          key={id}
          value={id}
        >
          {capitalize(name)}
        </option>
      }

      return <option
        defaultValue={selectedItem == item}
        selected={selectedItem == item}
        key={index}
        value={item}
      >
        {capitalize(item)}
      </option>
    })
  }
  return (
    <label className="text-sm">
      {/* {capEach(separateBy(name, "_"))}:{" "} */}
      <select
        name={name}
        onChange={set && ((e) => handleInputChange(e, set))}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
      >
        <option disabled={true} defaultValue={!selectedItem} selected={!selectedItem} value={false}>
          {(defaultOption)}
        </option>
        {getOptions()}

      </select>
      {validationErrors && <span className="text-red-500 font-normal">{validationErrors[name]}</span>}
    </label>
  )
}