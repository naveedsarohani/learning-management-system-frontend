import { capEach, capitalize } from "../../uitils/functions/global"

export default function Accordion({ title, children }) {
  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {capEach(title)}
      </h2>
      <div className="space-y-3 mb-4 relative">
        {children}
        <div className="border-b-4 border-blue-500  absolute -bottom-10ottom left-0 w-full opacity-20 "></div>
      </div>
    </div>
  )
}
