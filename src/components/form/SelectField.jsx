// import { useHandler } from "../../contexts/Handler"
// import { capEach, handleInputChange } from "../../uitils/functions/global"

// export default function SelectField({
//   data = [''],
//   name,
//   value = null,
//   className,
//   selected,
//   set = null,
// }) {
//   const {
//     handler: { validationErrors },
//   } = useHandler()

//   return (
//     <label>
//       {/* {capEach(separateBy(name, "_"))}:{" "} */}
//       <select
//         name={name}
//         onChange={set && ((e) => handleInputChange(e, set))}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
//       >
//         <option defaultValue={true} disabled={true}>
//           {(value ?? data[0].includes(':disabled') ? data[0].replace(':disabled', '') : null) ?? "Please choose any one of the the following"}
//         </option>

//         {data.map((role) => (
//           <option
//             defaultValue={selected === role}
//             key={role}
//             value={role}
//           >
//             {capEach(role)}
//           </option>
//         ))}
//       </select>
//       {validationErrors && <span>{validationErrors[name]}</span>}
//     </label>
//   )
// }

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

  return (
    <label>
      {/* {capEach(separateBy(name, "_"))}:{" "} */}
      <select
        name={name}
        onChange={set && ((e) => handleInputChange(e, set))}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300 mt-4"
      >
        <option disabled={true} defaultValue={!selectedItem} selected={!selectedItem} value={false}>
          {(defaultOption)}
        </option>

        {items.map((currentItem, index) => (
          <option
            defaultValue={selectedItem == currentItem}
            selected={selectedItem == currentItem}
            key={index}
            value={currentItem}
          >
            {capitalize(currentItem)}
          </option>
        ))}
      </select>
      {validationErrors && <span>{validationErrors[name]}</span>}
    </label>
  )
}